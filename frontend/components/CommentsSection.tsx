"use client";

import { useEffect, useState } from "react";
import { Send, User } from "lucide-react";
import { apiFetch } from "../lib/api";
import type { Comment } from "../lib/types";

type CommentsSectionProps = {
  model: string;
  objectId: number;
  locale: string;
};

export default function CommentsSection({ model, objectId, locale }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await apiFetch<any>(`/comments/comments/?model=${model}&object_id=${objectId}`);
        // Adjust for potential pagination in response
        const results = Array.isArray(data) ? data : data.results || [];
        setComments(results);
      } catch (err) {
        console.error("Failed to fetch comments", err);
        setError("Yorumlar yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [model, objectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Check auth locally (simple check)
    const token = typeof window !== "undefined" ? window.localStorage.getItem("tp_access_token") : null;
    if (!token) {
        alert("Yorum yapmak için giriş yapmalısınız.");
        return;
    }

    try {
      setIsSubmitting(true);
      const created = await apiFetch<Comment>("/comments/comments/", {
        method: "POST",
        body: JSON.stringify({
          model: model,
          object_id: objectId,
          body: newComment,
        }),
      });
      setComments((prev) => [created, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment", err);
      alert("Yorum gönderilemedi. Lütfen giriş yaptığınızdan emin olun.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <div className="py-8 text-center text-stone-500">Yorumlar yükleniyor...</div>;

  return (
    <div className="mt-12 rounded-2xl border border-stone-100 bg-white p-6 shadow-lg sm:p-10">
      <h3 className="mb-8 text-2xl font-bold text-stone-900">Yorumlar ({comments.length})</h3>

      <form onSubmit={handleSubmit} className="mb-10">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Düşüncelerinizi paylaşın..."
            className="w-full rounded-xl border border-stone-200 bg-stone-50 p-4 pb-12 text-stone-900 transition focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            rows={3}
          />
          <button
            type="button" // Actually submit is handled by form, but button needs type submit
            onClick={(e) => handleSubmit(e as any)}
            disabled={isSubmitting || !newComment.trim()}
            className="absolute bottom-3 right-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? "Gönderiliyor..." : <span className="flex items-center gap-2">Gönder <Send size={14} /></span>}
          </button>
        </div>
      </form>

      <div className="space-y-8">
        {comments.length === 0 ? (
          <p className="text-center text-stone-500 italic">Henüz yorum yapılmamış. İlk yorumu sen yap!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-stone-200">
                {comment.user_details?.avatar ? (
                  <img src={comment.user_details.avatar} alt={comment.user_details.username} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-stone-400">
                    <User size={20} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="font-semibold text-stone-900">{comment.user_details?.display_name || comment.user_details?.username || "Kullanıcı"}</span>
                  <span className="text-xs text-stone-400">{formatDate(comment.created_at)}</span>
                </div>
                <p className="leading-relaxed text-stone-700">{comment.body}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
