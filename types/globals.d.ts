/* eslint-disable @typescript-eslint/no-unused-vars */
import '@tanstack/react-table'

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: 'select' | 'date';
        selectOptions?: string[];
    }
    interface FilterFns {
        dateRangeFilter: FilterFn<unknown>;
      }
      interface ColumnFiltersOptions<TData extends RowData> {
        filterFns?: Record<string, FilterFn<TData>>;
      }
  }