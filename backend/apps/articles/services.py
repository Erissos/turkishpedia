from django.utils import timezone

from .models import Article, ArticleRevision


def create_revision(article: Article, editor, summary: str = "") -> ArticleRevision:
    return ArticleRevision.objects.create(
        article=article,
        editor=editor,
        content_snapshot=article.content,
        summary=summary,
        created_at=timezone.now(),
    )
