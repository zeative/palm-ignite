import { format } from 'date-fns';

const GITHUB_API_URL = 'https://api.github.com/repos/palmignitecharcoaltrade/palmignite-charcoal-blogs';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const getHeaders = () => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }
  return headers;
};

export interface BlogPost {
  id: number;
  number: number;
  title: string;
  body: string;
  cover_image?: string | null;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: {
    name: string;
    color: string;
  }[];
  html_url: string;
}

const extractFirstImage = (markdown: string): string | null => {
  // Match Markdown image: ![alt](url)
  const mdMatch = markdown.match(/!\[.*?\]\((.*?)\)/);
  if (mdMatch && mdMatch[1]) return mdMatch[1];

  // Match HTML image: <img src="url" ... />
  const htmlMatch = markdown.match(/<img.*?src=["'](.*?)["']/);
  if (htmlMatch && htmlMatch[1]) return htmlMatch[1];

  return null;
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/issues?state=open&sort=created&direction=desc`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    const data = await response.json();
    
    return data
      .filter((issue: any) => !issue.pull_request)
      .map((issue: any) => ({
        ...issue,
        cover_image: extractFirstImage(issue.body || '')
      }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/issues/${id}`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch blog post');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching blog post ${id}:`, error);
    return null;
  }
};

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'MMMM d, yyyy');
};
