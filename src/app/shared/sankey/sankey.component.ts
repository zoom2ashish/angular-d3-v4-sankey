import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import * as d3Sankey from 'd3-sankey';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import { ThrowStmt } from '@angular/compiler';

export enum Alignment {
  Center = 'Center',
  Left = 'Left',
  Right = 'Right',
 Justify = 'Justify'
}

export interface NodeData extends d3Sankey.SankeyExtraProperties {
  color?: string;
  labelPosition?: {
    x: number;
    y: number;
    dy: number|string;
    labelValue: string;
  }
}

export interface LinkData {
  color?: string;
  path?: string;
}

export interface UISankeyNode extends d3Sankey.SankeyNode<NodeData, LinkData> {
}

export interface UISankeyLink extends d3Sankey.SankeyLink<NodeData, LinkData> {
}

@Component({
  selector: 'app-sankey',
  templateUrl: './sankey.component.html',
  styleUrls: ['./sankey.component.css']
})
export class SankeyComponent<N extends UISankeyNode = UISankeyNode, L extends UISankeyLink = UISankeyLink> implements OnInit {
  @ViewChild('svg', { static: true }) private svgContainer: ElementRef<SVGElement>;

  @Input() alignment = Alignment.Justify;
  @Input() nodeWidth = 15;
  @Input() nodePadding = 10;
  @Input() margin = { top: 20, bottom: 20, left: 20, right: 20 };
  @Input() labelPadding = '0.35em';
  @Input() nodes: N[];
  @Input() links: L[];

  sankeyLayout: d3Sankey.SankeyGraph<UISankeyNode, UISankeyLink>;
  colorScale = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

  constructor() {}

  ngOnInit() {
    if (this.nodes && this.links) {
      this.sankeyLayout = this.generateSankeyLayout(this.nodes, this.links);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nodes || changes.links) {
      if (this.nodes && this.links) {
        this.sankeyLayout = this.generateSankeyLayout(this.nodes, this.links);
      }
    }
  }

  generateSankeyLayout(nodes: UISankeyNode[], links: UISankeyLink[]) {
    const element = this.svgContainer.nativeElement;
    const { width, height } = element.getBoundingClientRect();

    // get Layout Type
    const alignMethod = d3Sankey.sankeyJustify; // [`sankey${this.alignment}`];
    const sankeyGeneratorFn = d3Sankey
      .sankey()
      .nodeAlign(alignMethod)
      .nodeWidth(this.nodeWidth)
      .nodePadding(this.nodePadding)
      .extent([[20, 20], [width - this.margin.left - this.margin.right, height - this.margin.top - this.margin.bottom]]);

    const input = {
      nodes: nodes.map(d => Object.assign({}, d)),
      links: links.map(d => Object.assign({}, d))
    };

    const output = <d3Sankey.SankeyGraph<UISankeyNode, UISankeyLink>>sankeyGeneratorFn(input);

    output.nodes.forEach((node: UISankeyNode) => {
      node.color = this.colorScale(node.name);
      node.labelPosition = {
        x: node.x0 < width / 2 ? node.x1 + 6 : node.x0 - 50,
        y: (node.y1 + node.y0) / 2,
        dy: this.labelPadding,
        labelValue: node.name
      };
    });

    output.links.forEach((link: UISankeyLink, index: number) => {
      link.color = this.colorScale((<NodeData>link.source).name);
      link.path = d3Sankey.sankeyLinkHorizontal()(link);
      link.width = Math.max(1, link.width);
    });

    return output;
  }
}