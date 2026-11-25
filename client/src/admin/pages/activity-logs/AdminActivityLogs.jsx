import { useEffect, useMemo, useState } from 'react';
import {
  PageHeader,
  SearchInput,
  FilterDropdown,
  ApiBoundaryBanner,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatDate } from '../../../utils/formatters.js';

export default function AdminActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    adminApi.getActivityLogs().then((res) => {
      setLogs(res.data || []);
      setUnavailable(res.unavailable);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return logs.filter((l) => {
      const matchSearch =
        !q ||
        l.adminName?.toLowerCase().includes(q) ||
        l.description?.toLowerCase().includes(q);
      const matchMod = moduleFilter === 'all' || l.module === moduleFilter;
      return matchSearch && matchMod;
    });
  }, [logs, search, moduleFilter]);

  const columns = [
    { key: 'adminName', label: 'Admin' },
    { key: 'action', label: 'Action' },
    { key: 'module', label: 'Module' },
    { key: 'description', label: 'Description' },
    { key: 'ip', label: 'IP Address' },
    { key: 'createdAt', label: 'Timestamp', render: (r) => formatDate(r.createdAt) },
  ];

  return (
    <div>
      <PageHeader
        title="Activity Logs"
        description="Read-only audit trail of administrative actions across GRAMIYAM."
        breadcrumbs={[{ label: 'Activity Logs' }]}
      />
      <ApiBoundaryBanner endpoint="/api/admin/activity-logs" unavailable={unavailable} />
      <div className="mb-5 flex flex-wrap gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search admin or description..." className="w-full sm:w-72" />
        <FilterDropdown
          label="Module"
          value={moduleFilter}
          onChange={setModuleFilter}
          options={[
            { value: 'all', label: 'All Modules' },
            { value: 'products', label: 'Products' },
            { value: 'orders', label: 'Orders' },
            { value: 'content', label: 'Content' },
            { value: 'users', label: 'Admin Users' },
            { value: 'settings', label: 'Settings' },
          ]}
        />
      </div>
      <DataTable columns={columns} data={filtered} loading={loading} emptyTitle="No activity logs recorded" />
    </div>
  );
}
