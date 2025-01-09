import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  input,
} from '@angular/core';
import {
  PaginationNumberFormatterParams,
  GridOptions,
  ColDef,
  RowGroupingDisplayType,
} from 'ag-grid-community';
import { AgGridActionComponent } from '../elements/ag-grid-actions.component';
import { AgGridService } from '../_utils/ag-grid.service';
import { StorageService } from '@shell/shared-services';
import { CustomStatusCellRendererComponent } from '../elements/custom-status-cell-renderer/custom-status-cell-renderer.component';

@Component({
  selector: 'mack-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrl: './ag-grid.component.css',
})
export class AgGridComponent {
  // @Input() gridDetails: any;
  @Input({ required: true }) gridId: any = '';
  public styler = input<any>(null);
  @Input() height!: any;
  @Input() rowGroupPanelShow:
    | 'always'
    | 'onlyWhenGrouping'
    | 'never'
    | undefined = 'always';
  @Input() pivotPanelShow: 'always' | 'onlyWhenGrouping' | 'never' | undefined =
    'always';
  @Input() groupDisplayType: RowGroupingDisplayType =
    this.agGridService.groupDisplayType;
  @Input({ required: true }) columnDefs: any[] = [];
  @Input() pagination: boolean = false;
  @Input() masterDetail: boolean = false;
  @Input() showRowGroup: boolean = false;
  @Input() hideExtraUtils: boolean = false;
  public paginationPageSize = 10;
  @Input() paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  @Input({ required: true }) rowData: any[] = [];
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '[' + params.value.toLocaleString() + ']';
  };
  @Output() getGridApi = new EventEmitter<any>();
  @Output() getGridOpt = new EventEmitter<any>();
  @Output() getGridColumnApi = new EventEmitter<any>();
  @Output() saveTemp = new EventEmitter<any>();
  @Input() exportName: any;
  @Input() isLanding: boolean = false;
  // public styler = input<any>();
  public isFullScreen = input<boolean>(false);
  public rowSelection = input<any>();

  @Input() defaultColDef = this.agGridService.DefaultColDef;
  @Input() gridOptions: GridOptions = {
    paginationPageSize: 20,
    headerHeight: 30,
    rowHeight: 25,
    autoSizeStrategy: {
      type: 'fitGridWidth',
      defaultMinWidth: 100,
    },
    suppressHorizontalScroll: false,
    detailCellRendererParams: {},
    context: {
      componentParent: this,
    },
    sideBar: 'filters',
  };
  excelStyles = this.agGridService.ExcelStyles;
  sideBar = this.agGridService.SideBar;
  sideBarDef = this.agGridService.sideBarDef;
  @Input() customComponents = {
    statusRenderer: CustomStatusCellRendererComponent,
    actionRenderer: AgGridActionComponent,
  };
  private _statusFilter: any;

  @Input() 
  set statusFilter(value: any) {
    this._statusFilter =  Array.isArray(value) ? value.join('') : value;
    this.updateStatusFilter(this._statusFilter);
  }
  public tooltipShowDelay = 0;
  totalRowCount: number = 0;
  selectedTemplateIndex = 0;
  selectedItem = '';
  gridApi: any;
  gridOpt: any;
  gridColumnApi: any;
  agGridToolbar: any = {};
  saveAsTemplateList: any[] = [];
  userDetails!: any;
  selectedChip = '';
  removable = true;

  constructor(
    private agGridService: AgGridService,
    private storageService: StorageService
  ) {

  }

  ngOnInit(): void {
    this.userDetails = this.storageService.getUserDetails();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes && (changes['rowData'] || [])) {
      if (!changes['rowData'].currentValue) {
        this.rowData = [];
      }
      this.totalRowCount =
        this.rowData && this.rowData.length > 0 ? this.rowData.length : 0;
      this.height = this.rowData.length > 10 ? { height: '450px' } : '';
    }
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridOpt = this.gridOptions;
    this.gridColumnApi = params.columnApi;
    let updatedColumnDef: ColDef[] = this.gridApi
      .getColumnDefs()
      .map((data: any) => {
        if (
          data?.cellRendererParams == 'dateField' ||
          data?.cellRendererParams?.type == 'dateField'
        ) {
          return {
            ...data,
            comparator: (valueA: string, valueB: string) => {
              return this.agGridService.dateComparator(valueA, valueB);
            },
            filter: 'agDateColumnFilter',
            filterParams: {
              comparator: this.agGridService.datefilterComparator.bind(
                this.agGridService
              ),
              inRangeFloatingFilterDateFormat: this.storageService.getTokenValueByKey('dateFormat')?.toUpperCase(),
            },
            cellStyle: { 'text-align': 'right' },
            valueGetter: (params: any) => {
              const withTime = data?.cellRendererParams?.withTime || false;
              let fieldName = params?.colDef?.field;
              if (params?.data && fieldName !== null) {
                return this.agGridService.getDateStringForDisplay(
                  params?.data[fieldName],
                  withTime
                );
              }
              return '';
            },
          };
        } else if (data?.cellRendererParams == 'number') {
          return {
            ...data,
            cellStyle: { 'text-align': 'right' },
          };
        } else if (data?.cellRendererParams == 'boolean') {
          return {
            ...data,
            valueGetter: (params: any) => {
              let fieldName = params?.colDef?.field;
              if (params?.data && fieldName !== null) {
                return this.agGridService.booleanFormatter(
                  params?.data[fieldName]
                );
              }
              return '';
            },
          };
        } else {
          return data;
        }
      });
    this.columnDefs = updatedColumnDef;
    this.gridApi.openToolPanel(false);
    this.gridparams();
    this.gridApi.addEventListener(
      'filterChanged',
      this.onFilterChanged.bind(this)
    );
    this.agGridToolbar['saveTemplate'] = this.updateTemplate.bind(this);
    this.agGridToolbar['saveAsTemplate'] = this.saveAsTemplate.bind(
      this,
      this.gridColumnApi,
      this.saveAsTemplateList,
      'save-as'
    );
    this.agGridToolbar['deleteTemplate'] = this.deleteTemplate.bind(this);
    this.getAgGridTemplate();
    this.gridApi.sizeColumnsToFit();
  }

  saveAsTemplate(gridColumnApi: any, id: any, title: string) {
    this.agGridService.saveAsTemplate(
      this.gridId,
      event,
      gridColumnApi,
      this.saveAsTemplateList,
      title,
      (res: any) => {
        this.getAgGridTemplate();
      }
    );
  }
  updateStatusFilter(stsfilter:string){
    const currentFilterModel = this.gridApi?.getFilterModel();
    const isFilterActive =
      currentFilterModel &&
      currentFilterModel.status &&
      currentFilterModel.status.type === 'contains';
    this.gridApi?.setFilterModel({ status: stsfilter });
    if (isFilterActive) {
        // if the filter has some value and changed to another value
        if (currentFilterModel.status.filter !== stsfilter) {
          const customFilterParams = {
            type: 'contains',
            filter: stsfilter,
          };
          this.gridApi?.setFilterModel({ status: customFilterParams });
        }else {
            // if the filter has same value
            this.gridApi?.setFilterModel(null);
        }
    }  else {
        // if the filter has no value
        const customFilterParams = {
          type: 'contains',
          filter: stsfilter,
        };
        this.gridApi?.setFilterModel({ status: customFilterParams });
    }
  }
  exportAsExcel() {
    this.agGridService.exportAsExcel(
      this.gridApi,
      this.gridColumnApi,
      this.exportName,
      this.exportName,
      this.excelStyles
    );
  }

  exportAsCSV() {
    this.agGridService.exportAsCSV(
      this.gridApi,
      this.gridColumnApi,
      this.exportName,
      this.exportName,
      this.excelStyles
    );
  }
  deleteTemplate(chip: any) {
    chip = this.getFirstKey(chip);
    const index = this.saveAsTemplateList.findIndex((x: any) => {
      const findData = this.getFirstKey(x);
      return findData === chip;
    });
    this.selectedTemplateIndex = index - 1;

    this.saveAsTemplateList.splice(index, 1);
    let payloadTemplate: any = {};
    this.saveAsTemplateList.forEach((element: any, index: number) => {
      // else{
      payloadTemplate[Object.keys(element)[0]] =
        element[Object.keys(element)[0]];
      // }
      if (this.saveAsTemplateList.length == index + 1) {
        payloadTemplate['defaultTemplate'] = Object.keys(
          this.saveAsTemplateList[this.selectedTemplateIndex]
        )[0];
      }
    });
    const defaultTemplate = Object.keys(
      this.saveAsTemplateList[this.selectedTemplateIndex] || ''
    );
    this.selectedItem = defaultTemplate[0]|| '';
    // const defaultVariable:any={defaultTemplate: this.getFirstKey(this.saveAsTemplateList[this.selectedTemplateIndex])}
    // payloadTemplate.push(defaultVariable[0]);
    const payload = {
      userCode: this.userDetails.userCode,
      gridId: this.gridId,
      template: JSON.stringify(payloadTemplate),
      status: 'A',
    };
    this.agGridService.updateTemplate(payload, (res: any) => {
      this.getAgGridTemplate();
    });
  }

  getFirstKey(obj: any): string {
    if (obj) {
      return Object.keys(obj)[0];
    } else {
      return '';
    }
  }

  selectAgTemplate(chip: any): void {
    chip = this.getFirstKey(chip);
    this.selectedChip = chip;
    const selectedIndex = this.findIndexByIdentifier(chip);
    this.selectedTemplateIndex = selectedIndex;
    if (this.saveAsTemplateList && this.saveAsTemplateList.length > 0) {
      this.gridColumnApi.applyColumnState({
        state: this.saveAsTemplateList[selectedIndex][chip].view,
        applyOrder: true,
      });
    }
  }

  findIndexByIdentifier(identifier: string): number {
    for (let i = 0; i < this.saveAsTemplateList.length; i++) {
      const obj = this.saveAsTemplateList[i];
      if (identifier in obj) {
        return i;
      }
    }
    return -1;
  }

  columnFilter() {
    const newColumnDefs = this.columnDefs.map((columnDef) => {
      return {
        ...columnDef,
        filter: 'agMultiColumnFilter',
        floatingFilter: false,
      };
    });
    this.gridApi.setColumnDefs(newColumnDefs);
    this.gridApi.refreshHeader();
  }

  filter() {
    const newColumnDefs = this.columnDefs.map((columnDef, index) => {
      return {
        ...columnDef,
        filter: 'agTextColumnFilter',
        floatingFilter: index ? true : false,
      };
    });

    this.gridApi.setColumnDefs(newColumnDefs);
    this.gridApi.refreshHeader();
  }

  reset() {
    const originalColumnDefs = this.columnDefs;
    originalColumnDefs.forEach((shore: any, index: any) => {
      shore.hide = false;
      shore.pivot = false;
      shore.rowGroup = false;
      if (index) {
        shore.sortable = true;
        shore.floatingFilter = true;
      } else {
        shore.pinned = 'left';
        shore.sortable = false;
        shore.floatingFilter = false;
      }
    });
    this.gridApi.setColumnDefs(originalColumnDefs);
    this.gridApi.refreshHeader();

    const payload = {
      userCode: this.userDetails.userCode,
      gridId: this.gridId,
      template: {},
      status: 'A',
    };
    this.agGridService.resetTemplate(payload, (res: any) => {
      this.getAgGridTemplate();
    });
  }

  getAgGridTemplate() {
    const payload = this.gridId;
    this.agGridService.getTemplate(payload, (res: any) => {
      const saveAs = JSON.parse(res.result[0].template);
      const { defaultTemplate: removedValue, ...remainingData } = saveAs;
      const keysArray = Object.keys(remainingData);
      let newArray: any = [];
      this.selectedItem = removedValue;
      keysArray.forEach((key) => {
        const payLoadData = {
          [key]: remainingData[key],
        };
        newArray.push(payLoadData);
      });
      this.saveAsTemplateList = newArray && newArray.length > 0 ? newArray : [];
      this.selectedTemplateIndex =
        this.saveAsTemplateList.length < 2
          ? 0
          : this.saveAsTemplateList.length - 1;
      this.selectAgTemplate(
        this.saveAsTemplateList[this.selectedTemplateIndex]
      );
    });
  }

  updateTemplate(data: any) {
    if (this.saveAsTemplateList && this.saveAsTemplateList.length == 0) {
      this.saveAsTemplate(this.gridColumnApi, 1, 'save');
    } else {
      let payloadTemplate: any = {};

      const selectedCols = this.gridColumnApi.getColumnState();
      this.saveAsTemplateList[this.selectedTemplateIndex][
        this.selectedChip
      ].view = selectedCols;
      this.saveAsTemplateList.map((element: any) => {
        payloadTemplate[Object.keys(element)[0]] = Object.values(element)[0];
      });
      payloadTemplate['defaultTemplate'] = Object.keys(
        this.saveAsTemplateList[this.selectedTemplateIndex]
      )[0];
      const payload = {
        userCode: this.userDetails.userCode,
        gridId: this.gridId,
        template: JSON.stringify(payloadTemplate),
      };
      this.agGridService.updateTemplate(payload, (res: any) => {
        this.getAgGridTemplate();
      });
    }
  }

  gridparams() {
    this.getGridApi.emit(this.gridApi);
    this.getGridOpt.emit(this.gridOpt);
    this.getGridColumnApi.emit(this.gridColumnApi);
  }

  onFilterChanged() {
    this.totalRowCount = this.gridApi.getDisplayedRowCount();
  }
}
