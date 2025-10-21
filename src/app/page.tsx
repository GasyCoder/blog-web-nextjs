// src/app/page.tsx

import { postsApi, categoriesApi } from '@/lib/api';
import PostList from '@/components/posts/PostList';
import Pagination from '@/components/posts/Pagination';
import Container from '@/components/layout/Container';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { Search } from 'lucide-react';

interface HomeProps {
  searchParams: {
    page?: string;
    search?: string;
    category?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search;
  const category = searchParams.category;

  // Fetch posts
  const postsData = await postsApi.getAll({
    page,
    per_page: 9,
    search,
    category,
  });

  // Fetch categories for filter
  const categories = await categoriesApi.getAll();

  return (
    <Container>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Bienvenue sur le Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez des articles sur le développement web, la technologie et bien plus encore.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <form className="relative w-full md:w-96">
            <input
              type="text"
              name="search"
              placeholder="Rechercher un article..."
              defaultValue={search}
              className="w-full h-10 px-4 pr-10 rounded-md border border-input bg-background"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>
          </form>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Link href="/">
              <Badge variant={!category ? 'default' : 'outline'}>
                Tous
              </Badge>
            </Link>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/?category=${cat.slug}`}>
                <Badge
                  variant={category === cat.slug ? 'default' : 'outline'}
                  style={
                    category === cat.slug
                      ? { backgroundColor: cat.color }
                      : undefined
                  }
                  className={category === cat.slug ? 'text-white' : ''}
                >
                  {cat.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Active filters info */}
        {(search || category) && (
          <div className="mt-4 text-sm text-muted-foreground">
            {search && <span>Recherche : "{search}" </span>}
            {category && <span>Catégorie : {category} </span>}
            <Link href="/" className="text-primary hover:underline ml-2">
              Réinitialiser les filtres
            </Link>
          </div>
        )}
      </div>

      {/* Posts Grid */}
      <PostList
        posts={postsData.data}
        emptyMessage="Aucun article trouvé. Essayez de modifier vos filtres."
      />

      {/* Pagination */}
      <Pagination meta={postsData.meta} baseUrl="/" />
    </Container>
  );
}