from django.http import JsonResponse
from django.db import connection
from django.core.paginator import Paginator, EmptyPage
from django.views.generic import TemplateView


class ReactAppView(TemplateView):
    template_name = 'index.html'


def journals_list(request):
    # Execute the raw SQL query
    with connection.cursor() as cursor:
        cursor.execute("SELECT DISTINCT journal_title FROM pubmed_article ORDER BY journal_title;")
        journal_titles = [row[0] for row in cursor.fetchall()]

    # Paginate the result
    page_number = request.GET.get('page', 1)
    paginator = Paginator(journal_titles, 200)  # 200 items per page

    try:
        journals = paginator.page(page_number)
    except EmptyPage:
        return JsonResponse({'error': 'No such page'}, status=404)

    # Create a response with the paginated journal titles
    response_data = {
        'journals': journals.object_list,
        'pagination': {
            'next': journals.next_page_number() if journals.has_next() else None,
            'previous': journals.previous_page_number() if journals.has_previous() else None,
            'current': journals.number,
            'total_pages': paginator.num_pages
        }
    }
    return JsonResponse(response_data)


def journal_detail(request):
    journal_title = request.GET.get('title')
    # Raw SQL query
    raw_query = """
    SELECT DISTINCT pubmed_author.author_id, pubmed_author.author_name
    FROM pubmed_author
        INNER JOIN article_author ON pubmed_author.author_id = article_author.author_id
        INNER JOIN pubmed_article ON article_author.article_id = pubmed_article.article_id
    WHERE pubmed_article.journal_title = %s
    ORDER BY pubmed_author.author_name;
    """

    with connection.cursor() as cursor:
        cursor.execute(raw_query, [journal_title])
        authors = [{'id': row[0], 'name': row[1]} for row in cursor.fetchall()]

    response_data = {
        'journal_title': journal_title,
        'authors': authors
    }
    return JsonResponse(response_data)


def author_detail(request):
    author_id = request.GET.get('id')
    raw_query = """
    SELECT
        author_name
    FROM
        pubmed_author
    WHERE pubmed_author.author_id = %s;
    """

    with connection.cursor() as cursor:
        cursor.execute(raw_query, [author_id])
        author_name = cursor.fetchall()[0][0]

    raw_query = """
    SELECT 
        DISTINCT pubmed_article.article_id AS article_id,
        pubmed_article.title AS article_title,
        pubmed_article.journal_title AS journal_title,
        pubmed_article.pubmed_link AS pubmed_link,
        pubmed_article.year AS year,
        article_coi.coi_text AS coi_text,
        (
            SELECT STRING_AGG(grant_info.grant_val, ', ')
            FROM pubmed_article pa
                LEFT JOIN article_grant ON article_grant.article_id = pa.article_id
                LEFT JOIN grant_info ON grant_info.grant_id = article_grant.grant_id
            WHERE pa.article_id = pubmed_article.article_id
        ) AS grant_val
    FROM pubmed_article
        INNER JOIN article_author ON pubmed_article.article_id = article_author.article_id
        LEFT JOIN article_coi ON pubmed_article.article_id = article_coi.article_id
    WHERE article_author.author_id = %s
    ORDER BY year DESC, journal_title;
    """

    with connection.cursor() as cursor:
        cursor.execute(raw_query, [author_id])
        publications = [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]

    response_data = {
        'author_id': author_id,
        'author_name': author_name,
        'publications': publications
    }
    return JsonResponse(response_data)


def article_authors(request):
    article_id = request.GET.get('id')
    # Raw SQL query
    raw_query = """
    SELECT pubmed_author.author_id, pubmed_author.author_name
    FROM pubmed_author
    INNER JOIN article_author ON pubmed_author.author_id = article_author.author_id
    WHERE article_author.article_id = %s;
    """

    with connection.cursor() as cursor:
        cursor.execute(raw_query, [article_id])
        authors = [{'author_id': row[0], 'author_name': row[1]} for row in cursor.fetchall()]

    return JsonResponse({'authors': authors})
