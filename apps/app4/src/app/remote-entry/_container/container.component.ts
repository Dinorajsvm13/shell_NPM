import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MackAgGridModule } from '@shell/shared-ag-grid';

@Component({
  selector: 'shell-app2-container',
  standalone: true,
  imports: [CommonModule, MackAgGridModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true, resizable: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true, resizable: true },
    { headerName: 'Role', field: 'role', sortable: true, filter: true, resizable: true },
    { headerName: 'Department', field: 'department', sortable: true, filter: true, resizable: true },
    { headerName: 'Joining Date', field: 'joiningDate', sortable: true, filter: true, resizable: true }
  ];

  dataSource = [
    { id: 1, name: 'John Doe', role: 'Developer', department: 'IT', joiningDate: '2023-06-15' },
    { id: 2, name: 'Jane Smith', role: 'Manager', department: 'HR', joiningDate: '2021-03-10' },
    { id: 3, name: 'Mike Johnson', role: 'Designer', department: 'Marketing', joiningDate: '2022-11-20' },
    { id: 4, name: 'Emily Davis', role: 'Tester', department: 'QA', joiningDate: '2024-01-05' }
  ];

}
