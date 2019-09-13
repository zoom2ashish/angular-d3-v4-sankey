import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {

  nodes = [];

  links = [];

  constructor() {}

  ngOnInit() {
    this.useDataset2();
  }

  useDataset1() {
    this.nodes = [
      {"id": "Alice", "name": "Alice"},
      {"id": "Bob", "name": "Bob"},
      {"id": "Carol", "name": "Carol"},
      {"id": "Ashish", "name": "Ashish"},
      {"id": "Tejas", "name": "Tejas"},
    ];

    this.links = [
      {"source": 0, "target": 1, value: 30 },
      {"source": 0, "target": 2, value: 70},
      {"source": 1, "target": 2, value: 10 },
      {"source": 3, "target": 1, value: 50 },
      {"source": 4, "target": 2, value: 50 },
    ];
  }

  useDataset2() {
    const groups = [
      {"id": "G1", resource_type: "Group", name: "Windows VMs"},
      {"id": "G2", resource_type: "Group", name: "Linux VMs"},
      {"id": "G3", resource_type: "Group", name: "Coke VMs"},
      {"id": "G4", resource_type: "Group", name: "Pepsi VMs"}
    ];
    const services = [
      {"id": "S1", resource_type: "Service", name: "HTTP" },
      {"id": "S2", resource_type: "Service", name: "SSH" },
    ];

    this.nodes = [
      ...groups,
      ...services
    ];

    const serviceIndex = (i) => groups.length + i;

    this.links = [
      {id: "rule1-src-dest-link-1", "source": 0, "target": serviceIndex(0), value: 10 },
      {id: "rule1-src-dest-link-3", "source": 2, "target": serviceIndex(0), value: 10 },
      {id: "rule1-src-dest-link-2", "source": serviceIndex(0), "target": 1, value: 10 },

      {id: "rule2-src-dest-link-1", "source": 0, "target": serviceIndex(1), value: 10 },
      {id: "rule2-src-dest-link-2", "source": serviceIndex(1), "target": 3, value: 10 },

      {id: "rule3-src-dest-link-1", "source": 2, "target": serviceIndex(0), value: 10 },
      {id: "rule3-src-dest-link-2", "source": serviceIndex(0), "target": 3, value: 10 }
    ];
  }
}