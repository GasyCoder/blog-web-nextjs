// src/components/posts/Pagination.tsx

import Link from 'next/link';
import { PaginationMeta } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

interface PaginationProps {
  meta: PaginationMeta;
  baseUrl: string;
}

export default function Pagination({ meta, baseUrl }: PaginationProps) {
  const { current_page, last_page, from, to, total } = meta;

  if (last_page <= 1) return null;

  const getPageUrl = (page: number) => {
    return `${baseUrl}?page=${page}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    let startPage = Math.max(1, current_page - Math.floor(showPages / 2));
    let endPage = Math.min(last_page, startPage + showPages - 1);

    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link key={i} href={getPageUrl(i)}>
          <Button
            variant={i === current_page ? 'default' : 'outline'}
            size="sm"
          >
            {i}
          </Button>
        </Link>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-8">
      <div className="text-sm text-muted-foreground">
        Affichage de <span className="font-medium">{from}</span> à{' '}
        <span className="font-medium">{to}</span> sur{' '}
        <span className="font-medium">{total}</span> résultats
      </div>

      <div className="flex items-center space-x-2">
        {current_page > 1 && (
          <Link href={getPageUrl(current_page - 1)}>
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Précédent
            </Button>
          </Link>
        )}

        <div className="hidden md:flex space-x-2">{renderPageNumbers()}</div>

        {current_page < last_page && (
          <Link href={getPageUrl(current_page + 1)}>
            <Button variant="outline" size="sm">
              Suivant
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
