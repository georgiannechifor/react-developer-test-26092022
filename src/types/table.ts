export interface ApiTableProps {
  fetchData: () => Promise<any>,
  fetchingArea: string
}

export interface UserDiffType {
  field: string,
  oldValue: string,
  newValue: string
}

export interface TableData {
  id: string,
  timestamp: number,
  diff: UserDiffType[]
}

export interface TableProps {
  data: TableData[],
  error: string,
  onLoadMore: () => void,
  fetchingArea: string
}
