import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AgGridComponent } from "./ag-grid/ag-grid.component";
import { SaveAsTemplateComponent } from "./elements/save-as-template/save-as-template.component";
import { AgGridActionComponent } from "./elements/ag-grid-actions.component";
import { agGridTooltipComponent } from "./elements/ag-grid-tooltip.component";
import { AgGridCheckboxComponent } from "./elements/ag-grid-checkbox.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AgGridAngular } from "ag-grid-angular";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatChipsModule } from "@angular/material/chips";
import { ServicesModule } from "@shell/shared-services";
import { AgGridService } from "./_utils/ag-grid.service";
import { LicenseManager } from 'ag-grid-enterprise';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { CustomStatusCellRendererComponent } from "./elements/custom-status-cell-renderer/custom-status-cell-renderer.component";
LicenseManager.setLicenseKey(
  'CompanyName=SOLVERMINDS SOLUTIONS AND TECHNOLOGIES PRIVATE LIMITED,LicensedGroup=SVM Solutions & Technologies Pte. Ltd,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=6,AssetReference=AG-033022,SupportServicesEnd=18_November_2023_[v2]_MTcwMDI2NTYwMDAwMA==55aa1a1d8528a024728210e6983fb1ea'
);
@NgModule({
    declarations: [
        SaveAsTemplateComponent,
        AgGridComponent,
        AgGridActionComponent,
        AgGridCheckboxComponent,
        agGridTooltipComponent,
        CustomStatusCellRendererComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTooltipModule,
        AgGridAngular,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatChipsModule,
        MatDialogModule,
        ServicesModule
    ],
    exports: [
        SaveAsTemplateComponent,
        AgGridComponent,
        AgGridActionComponent,
        AgGridCheckboxComponent,
        agGridTooltipComponent,

    ],
    providers:[AgGridService]
})

export class MackAgGridModule {

}
