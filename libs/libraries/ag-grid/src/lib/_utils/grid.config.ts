import { ColumnState, GridOptions } from 'ag-grid-community';

export const gridConfig: GridOptions | any = {
  sideBar: {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        width: 150,
      },

      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        width: 150,
      },
    ],
    position: 'right',
    defaultToolPanel: 'none',
  },
  rowGroupPanelShow: 'always',
  groupDisplayType: 'multipleColumns',
  defaultColDef: {
    minWidth: 80,
    editable: false,
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: false,
    resizable: true,
    filterParams: {
      buttons: ['reset'],
      debounceMs: 500,
    },
    rowGroup: false,
    headerClass: 'header-class',
    enableRowGroup: true,
    enableValue: true,
    enablePivot: true,
  },
  suppressDragLeaveHidesColumns: true,
  suppressMenuHide: true,
  suppressClickEdit: true,
  suppressRowVirtualisation: true,
  suppressColumnVirtualisation: true,
  suppressRowClickSelection:true,
  rowSelection: 'multiple',
  masterDetail: true,
  editType: 'fullRow',
  floatingFiltersHeight: 30,
  headerHeight: 30,
  undoRedoCellEditing: true,
  tooltipShowDelay: 0,
  detailRowAutoHeight: true,
  excelStyles: [
    {
      id: 'customheader',
      alignment: {
        vertical: 'Center',
        horizontal: 'Center',
        wrapText: true,
      },
      borders: {
        borderBottom: {
          color: '#000000',
          lineStyle: 'Continuous',
          weight: 2,
        },
      },
      font: {
        size: 24,
        bold: true,
      },
    },
    {
      id: 'custom-header',
      interior: {
        color: '#bfbfbf',
        pattern: 'Solid',
      },
      alignment: {
        vertical: 'Center',
        horizontal: 'Left',
        wrapText: true,
      },
      borders: {
        borderBottom: {
          color: '#000000',
          lineStyle: 'Continuous',
          weight: 2,
        },
        borderLeft: {
          color: '#000000',
          lineStyle: 'Continuous',
          weight: 2,
        },
        borderRight: {
          color: '#000000',
          lineStyle: 'Continuous',
          weight: 2,
        },
        borderTop: {
          color: '#000000',
          lineStyle: 'Continuous',
          weight: 2,
        },
      },
      font: {
        size: 12,
        bold: true,
      },
     
    },
    {
      id: 'headerGroup',
      interior: {
        color: '#E4AB11',
        pattern: 'Solid',
      },
      borders: {
        borderBottom: { color: '#000000', lineStyle: 'Continuous', weight: 2 },
        borderLeft: { color: '#000000', lineStyle: 'Continuous', weight: 2 },
        borderRight: { color: '#000000', lineStyle: 'Continuous', weight: 2 },
        borderTop: { color: '#000000', lineStyle: 'Continuous', weight: 2 },
      },
      font: { size: 12, bold: true, color: '#ffffff' },
      alignment: {
        horizontal:'CenterAcrossSelection'
      },
    },
    {
      id: 'header',
      interior: {
        color: '#305496',
        pattern: 'Solid',
      },
      borders: {
        borderBottom: { color: '#000000', lineStyle: 'Continuous', weight: 2 },
        borderLeft: { color: '#000000', lineStyle: 'Continuous', weight: 2 },
        borderRight: { color: '#000000', lineStyle: 'Continuous', weight: 2 },
        borderTop: { color: '#000000', lineStyle: 'Continuous', weight: 2 },
      },
      font: { size: 12, bold: true, color: '#ffffff' },
    },
    
    {
      id: 'cell',
      borders: {
        borderBottom: { color: '#000000', lineStyle: 'Continuous', weight: 2 },
        borderLeft: { color: '#000000', lineStyle: 'Continuous', weight: 2 },
        borderRight: { color: '#000000', lineStyle: 'Continuous', weight: 2 },
        borderTop: { color: '#000000', lineStyle: 'Continuous', weight: 2 },
      },
      font: {
        size: 12,
      },
    },
    {
      id: 'dateType',
      font: {
        size: 12,
      },
      alignment: {
        horizontal: 'Right',
      },
    },
    
  ],
};
export const STATUS_BUTTON = {
  active: {
    value: 'ACTIVE',
    className: 'status-active',
  },
  inactive: {
    value: 'IN_ACTIVE',
    className: 'status-inactive',
  },
  true: {
    value: true,
    className: 'status-inactive',
  },
  false: {
    value: false,
    className: 'status-active',
  },
  draft: {
    value: 'DRAFT',
    className: 'status-draft',
  },
  initiated: {
    value: 'INITIATED',
    className: 'status-initiated',
  },
  reviewed: {
    value: 'REVIEWED',
    className: 'status-reviewed',
  },
  approved: {
    value: 'APPROVED',
    className: 'status-approved',
  },
  inprogress: {
    value: 'IN_PROGRESS',
    className: 'status-inprogress',
  },
  rejected: {
    value: 'REJECTED',
    className: 'status-rejected',
  },
  reassigned: {
    value: 'REASSIGNED',
    className: 'status-reassigned',
  },
  closeout: {
    value: 'CLOSE_OUT',
    className: 'status-closeout',
  },
  closed: {
    value: 'CLOSED',
    className: 'status-closeout',
  },
  cancelled: {
    value: 'CANCELLED',
    className: 'status-cancelled',
  },
  deleted: {
    value: 'DELETED',
    className: 'status-deleted',
  },
  submitted: {
    value: 'SUBMITTED',
    className: 'status-submitted',
  },
  requested: {
    value: 'REQUESTED',
    className: 'status-submitted',
  },
  confirmed: {
    value: 'CONFIRMED',
    className: 'status-approved',
  },
  updated: {
    value: 'UPDATED',
    className: 'status-reviewed',
  },
  published: {
    value: 'PUBLISHED',
    className: 'status-approved',
  },
  unpublished: {
    value: 'UNPUBLISHED',
    className: 'status-inprogress',
  },
  planned: {
    value: 'PLANNED',
    className: 'status-planned',
  },
};

export const STATUS_COLOR:any = {
  ACTIVE: '#0909d7',
  IN_ACTIVE: '#b8b8b8',
  true: '#b8b8b8',
  false: '#0909d7',
  INITIATED: '#186ee3',
  DRAFT: '#e3a40c',
  SUBMITTED: '#ff7c25',
  REVIEWED: '#0dcb28',
  APPROVED: '#00a65a',
  IN_PROGRESS: '#39b7cd',
  REJECTED: '#df372c',
  REASSIGNED: '#0e2350',
  CLOSE_OUT: '#ca0202',
  INACTIVE: '#ff7c25',
  CANCELLED: '#0e2350',
  DELETED: '#333333',
  CLOSED: '#ca0202',
  PLANNED: '#ca0202',
};

export const gridFilters = {
  distinctFilter: true,
  conditionFilter: 'agTextColumnFilter',
  multiFilter: 'agMultiColumnFilter',
  reset: 'reset',
};

export interface templateDetails {
  id?: number;
  gridId: string;
  gridMode: string;
  userCode: string;
  template: any;
}
export interface template {
  id: number;
  name: string;
  columDetails: ColumnState[];
  filterModel: any;
  gridMode: string;
  templateId?: number;
  isRemovable?: boolean;
}
export const gridMode = {
  template: 'T',
  globalTemplate: 'G',
};
