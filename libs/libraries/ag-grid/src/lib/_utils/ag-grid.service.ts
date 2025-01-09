import { Injectable } from '@angular/core';
import { RowGroupingDisplayType, SideBarDef } from 'ag-grid-enterprise';
import { ApiService, StorageService } from '@shell/shared-services';
import { SaveAsTemplateComponent } from '../elements/save-as-template/save-as-template.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import dayjs from 'dayjs/esm';

@Injectable({
  providedIn: 'root',
})
export class AgGridService {
  userDetails: any;
  totalRowCount: number = 0;
  dialogRef: MatDialogRef<SaveAsTemplateComponent> | undefined;

  constructor(
    public dialog: MatDialog,
    private sharedService: StorageService,
    private apiService: ApiService
  ) {
    this.userDetails = this.sharedService.getUserDetails();
  }

  public DefaultColDef: any = {
    resizable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: false,
    enableRowGroup: true,
    sortable: true,
    minWidth: 100,
    cellStyle: (params: any) => {
      const value = params.value;
      if (!isNaN(Number(value))) {
        return { textAlign: 'right' };
      } else if (value instanceof Date && !isNaN(value.getTime())) {
        return { textAlign: 'right' };
      } else if (typeof value === 'string' && !isNaN(Number(value))) {
        return { textAlign: 'left' };
      } else {
        return { textAlign: 'left' };
      }
    },
  };

  public SideBar: SideBarDef | string | string[] | boolean | null = [
    'columns',
    'filters',
  ];
  sideBarDef = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        minWidth: 225,
        width: 225,
        maxWidth: 225,
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        toolPanelParams: {
          suppressExpandAll: true,
          suppressFilterSearch: true,
        },
      },
    ],
    position: 'right',
    defaultToolPanel: 'columns',
  };

  public groupDisplayType: RowGroupingDisplayType = 'groupRows';
  public ExcelStyles: any = [
    {
      id: 'cellRight',
      alignment: {
        horizontal: 'Right',
        vertical: 'Center',
      },
    },
  ];
  dateComparator(date1: string, date2: string): number {
    if (!date1 && !date2) {
      return 0;
    } else if (!date1) {
      return -1;
    } else if (!date2) {
      return 1;
    }

    const formatter = this.userDetails.dateFormat.replace('dd', 'DD');
    const dayJsDate1 = dayjs(date1, formatter);
    const dayJsDate2 = dayjs(date2, formatter);

    if (dayJsDate1.isBefore(dayJsDate2)) {
      return -1;
    } else if (dayJsDate1.isAfter(dayJsDate2)) {
      return 1;
    } else {
      return 0;
    }
  }

  parseDate(dateStr: string) {
    const parsedDate = this.tryParseDate(dateStr, this.userDetails.dateFormat);
    if (parsedDate) {
      return parsedDate;
    }
    return null;
  }

  tryParseDate(dateStr: string, format: string) {
    const parts = format.split(/[\.\-\/]/);
    const dateParts = dateStr.split(/[\.\-\/]/);
    const yearIndex = parts.findIndex((part) => part.toLowerCase() === 'yyyy');
    const monthIndex = parts.findIndex((part) => part.toLowerCase() === 'mm');
    const dayIndex = parts.findIndex((part) => part.toLowerCase() === 'dd');
    if (yearIndex === -1 || monthIndex === -1 || dayIndex === -1) {
      return null;
    }
    const year = parseInt(dateParts[yearIndex], 10);
    const month = parseInt(dateParts[monthIndex], 10) - 1; // Months are 0-based
    const day = parseInt(dateParts[dayIndex], 10);
    return year * 10000 + month * 100 + day;
  }

  // ag-grid-menu-functions

  exportAsCSV(
    gridApi: any,
    columnApi: any,
    fileName: any,
    sheetName: any,
    excell: any
  ) {
    gridApi.exportDataAsCsv({
      fileName: fileName + '.csv',
      sheetName: sheetName ? sheetName : fileName,
      columnKeys: this.generateColumns(columnApi),
      excelStyles: excell,
      processCellCallback: function (params: any) {
        return params.value;
      },
    });
  }

  exportAsExcel(
    gridApi: any,
    columnApi: any,
    fileName: any,
    sheetName: any,
    excell: any
  ) {
    gridApi.exportDataAsExcel({
      fileName: fileName + '.xlsx',
      sheetName: sheetName ? sheetName : fileName,
      columnKeys: this.generateColumns(columnApi),
      excelStyles: excell,
      processCellCallback: function (params: any) {
        return params.value;
      },
    });
  }

  generateColumns(columnApi: any): string[] {
    var columnsToExclude = ['action', 'flag'];
    const allColumnKeys = columnApi
      .getAllDisplayedColumns()
      .map((column: { getColId: () => any }) => column.getColId());
    const columnKeysToExport = allColumnKeys.filter(
      (key: any) => !columnsToExclude.includes(key)
    );
    return columnKeysToExport;
  }
  //!  Normal Template Crud Functions
  getTemplate(gridid: any, successCallback: any) {
    this.apiService
      .get(
        '/api/common/v1/grid?userCode=' +
          this.userDetails?.userCode +
          `&gridId=${gridid}`
      )
      .subscribe((res: any) => {
        successCallback(res);
      });
  }

  createTemplate(payloadData: any, successCallback: any) {
    this.apiService
      .post('/api/common/v1/grid', payloadData)
      .subscribe((res: any) => {
        successCallback(res);
      });
  }

  deleteTemplate(payloadData: any, successCallback: any) {
    this.apiService
      .delete('/api/common/v1/grid', payloadData)
      .subscribe((res: any) => {
        successCallback(res);
      });
  }

  resetTemplate(payloadData: any, successCallback: any) {
    this.apiService
      .post('/api/common/v1/grid', payloadData)
      .subscribe((res: any) => {
        successCallback(res);
      });
  }

  updateTemplate(payloadData: any, successCallback: any) {
    this.apiService
      .put('/api/common/v1/grid', payloadData)
      .subscribe((res: any) => {
        successCallback(res);
      });
  }
  //!  Global Template Crud Functions
  getGlobalTemplate(gridid: string, successCallback: any) {
    this.apiService
      .get(`/api/common/v1/grid/global?gridId=${gridid}`)
      .subscribe((res: any) => {
        successCallback(res);
      });
  }

  createGlobalTemplate(payloadData: any, successCallback: any) {
    this.apiService
      .post('/api/common/v1/grid/global', payloadData)
      .subscribe((res: any) => {
        successCallback(res);
      });
  }

  deleteGlobalTemplate(payloadData: any, successCallback: any) {
    this.apiService
      .delete(`/api/common/v1/grid/global?gridId=${payloadData.gridid}`, '')
      .subscribe((res: any) => {
        successCallback(res);
      });
  }

  updateGlobalTemplate(payloadData: any, successCallback: any) {
    this.apiService
      .put('/api/common/v1/grid/global', payloadData)
      .subscribe((res: any) => {
        successCallback(res);
      });
  }

  createDynamicPayload(columnOrder: any, templateName: string): any {
    let payload = {};
    payload = {
      [templateName]: {
        view: columnOrder,
      },
    };
    return payload;
  }

  saveAsTemplate(
    gridId: any,
    gridType: any,
    gridColumnApi: any,
    saveAsTemplateList: any,
    title: string,
    closeCallback: any
  ) {
    const columnOrder = gridColumnApi.getColumnState();

    // Open Material Dialog and pass title via data
    this.dialogRef = this.dialog.open(SaveAsTemplateComponent, {
      width: '30vw',
      data: {
        // Pass the title as data
        title: title == 'save' ? 'Save Template' : 'Save As Template',
      },
    });

    // After the dialog is closed
    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const template = this.createDynamicPayload(columnOrder, result);
        const findExsist = saveAsTemplateList.find(
          (element: any) => element[result]
        );

        if (findExsist) {
          // Use Material Snackbar instead (if necessary)
          // this._snackbar.open('Template Name already exists', 'INFO', { duration: 3000 });
          return;
        }

        let payloadTemplate: any = {};
        saveAsTemplateList.map((element: any) => {
          payloadTemplate[Object.keys(element)[0]] = Object.values(element)[0];
        });

        payloadTemplate[Object.keys(template)[0]] = Object.values(template)[0];
        saveAsTemplateList.push(template);

        const payload = {
          userCode: this.userDetails.userCode,
          gridId: gridId,
          template: JSON.stringify(payloadTemplate),
        };

        this.createTemplate(payload, (res: any) => {
          closeCallback(res);
        });
      }
    });
  }

  selectChip(
    selectedIndex: any,
    saveAsTemplateList: any,
    gridColumnApi: any,
    callBack: any,
    chip: any
  ) {
    gridColumnApi.applyColumnState({
      state: JSON.parse(saveAsTemplateList[selectedIndex]['template']),
      applyOrder: true,
    });
    callBack(selectedIndex);
  }
  datefilterComparator(filterLocalDateAtMidnight: any, cellValue: any) {
    let dateFormat = this.sharedService.getTokenValueByKey('dateFormat');
    const dayJsFormat = this.mapCustomTodayJsFormat(dateFormat);
    let cellDate = dayjs(cellValue, dayJsFormat).startOf('day') ;
    let filterDate = dayjs(filterLocalDateAtMidnight).startOf('day') ;
    if (!cellDate.isValid() || !filterDate.isValid()) {
      return 0;
    }
    if (filterDate.isSame(cellDate, 'day')) {
      return 0;
    }
    if (cellDate.isBefore(filterDate, 'day')) {
      return -1;
    }
    if (cellDate.isAfter(filterDate, 'day')) {
      return 1;
    }
    return 0;
  }
  mapCustomTodayJsFormat(customFormat: string): string {
    return customFormat?.toUpperCase();
  }
  getDateStringForDisplay(
    dateStringValue: any,
    displayTime = false
  ) {
    dateStringValue = this.formatDateFromServerToDatePicker(
      dateStringValue,
      displayTime
    );
    if (
      dateStringValue &&
      this.sharedService.getTokenValueByKey('dateFormat')
    ) {
      let str = '';
      if (displayTime) {
        str = this.sharedService.getTokenValueByKey('dateTimeFormat')?.toUpperCase();
      } else {
        str = this.sharedService
          .getTokenValueByKey('dateFormat')
          ?.replace('dd', 'DD')
          ?.replace('HH:mm', '')
          ?.trim();
      }
      return dayjs(dateStringValue).format(str);
    }
    return dateStringValue;
  }

  booleanFormatter(value: any): string {
    switch (value) {
      case true:
        return 'Yes';
      case false:
        return 'No';
      case 'Y':
        return 'Yes';
      case 'N':
        return 'No';
    }
    return value;
  }
  formatDateFromServerToDatePicker(date: any, displayTime: boolean) {
    if (date) {
      let formatString = displayTime ? 'YYYY-MM-DDTHH:mm:ss.SSS' : 'YYYY-MM-DD';
      let dayJsDate = dayjs(date).format(formatString);

      return displayTime
        ? dayjs(dayJsDate)
        : dayjs(dayJsDate).startOf('day');
    }
    return null;
  }
}
