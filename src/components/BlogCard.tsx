import { BlogPost, formatDate } from "@/services/github";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link to={`/blog/${post.number}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm group cursor-pointer">
        <div className="relative h-48 overflow-hidden bg-muted">
          {post.cover_image ? (
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary/20">
              <span className="text-4xl">📝</span>
            </div>
          )}
        </div>
        <CardHeader className="space-y-2 p-4">
          <div className="flex flex-wrap gap-2">
            {post.labels.map((label) => (
              <Badge
                key={label.name}
                variant="secondary"
                className="text-xs font-medium"
                style={{
                  backgroundColor: `#${label.color}20`,
                  color: `#${label.color}`,
                  borderColor: `#${label.color}40`,
                }}
              >
                {label.name}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
        </CardHeader>
        <CardContent className="px-4">
          <p className="text-muted-foreground line-clamp-3">
            {post.body
              ?.replace(/!\[.*?\]\(.*?\)/g, "")
              .replace(/<[^>]*>?/gm, "")
              .replace(/[#*`]/g, "")
              .slice(0, 150)}
            ...
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground mt-auto px-4">
          <div className="flex items-center gap-1 mt-auto">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(post.created_at)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
