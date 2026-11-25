import { useMemo, useState } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdminEmptyState, AdminLoadingSkeleton } from '../common/AdminUIComponents.jsx';

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  pageSize = 10,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  emptyTitle = 'No records found',
  emptyDescription = 'No data returned for the current filters.',
}) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState('asc');

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageData = sortedData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  if (loading) {
    return <AdminLoadingSkeleton rows={5} />;
  }

  if (!data.length) {
    return <AdminEmptyState title={emptyTitle} description={emptyDescription} />;
  }

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const toggleAll = (checked) => {
    if (!onSelectionChange) return;
    if (checked) {
      onSelectionChange(pageData.map((r) => r._id || r.id));
    } else {
      onSelectionChange([]);
    }
  };

  const toggleRow = (id) => {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((i) => i !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  return (
    <div className="overflow-hidden rounded-md border border-[#E9E1D5] bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead className="border-b border-[#E9E1D5] bg-[#FFF9F1] text-[11px] font-semibold uppercase tracking-wider text-[#77736B]">
            <tr>
              {selectable && (
                <th className="w-10 px-4 py-3.5">
                  <input
                    type="checkbox"
                    aria-label="Select all rows on page"
                    checked={
                      pageData.length > 0 &&
                      pageData.every((r) => selectedIds.includes(r._id || r.id))
                    }
                    onChange={(e) => toggleAll(e.target.checked)}
                    className="accent-[#B93627]"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th key={col.key} className="whitespace-nowrap px-4 py-3.5">
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-[#B93627]"
                    >
                      {col.label}
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9E1D5] text-[#34332C]">
            {pageData.map((row, idx) => {
              const rowId = row._id || row.id || idx;
              return (
                <tr key={rowId} className="transition hover:bg-[#FFF9F1]/60">
                  {selectable && (
                    <td className="px-4 py-3.5">
                      <input
                        type="checkbox"
                        aria-label={`Select row ${rowId}`}
                        checked={selectedIds.includes(rowId)}
                        onChange={() => toggleRow(rowId)}
                        className="accent-[#B93627]"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="whitespace-nowrap px-4 py-3.5">
                      {col.render ? col.render(row) : row[col.key] ?? '—'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-[#E9E1D5] bg-[#FFF9F1]/50 px-4 py-3 text-xs text-[#77736B]">
          <span>
            Page <strong className="text-[#34332C]">{safePage}</strong> of{' '}
            {totalPages} ({data.length} records)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-[#E9E1D5] bg-white text-[#34332C] disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-[#E9E1D5] bg-white text-[#34332C] disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
