import { Component, OnInit, signal } from '@angular/core';
import { Poster } from '../../../../interfaces/poster';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-poster',
  imports: [],
  templateUrl: './poster.component.html',
  styleUrl: './poster.component.scss',
})
export class PosterComponent implements OnInit {
  posterData: Poster = {
    poNo: '1000172155',
    prNo: '1001369923',
    docketAwbNo: 'GSN24090300360067',
    challanNo: 'I/22795',
    poDate: '30-Jan-25',
    dispatchedThrough: 'GRANDSPEED COURIER',
    docketAwbDate: '3-Feb-25',
    challanDate: '1-Feb-25',
    companyName: 'Apple Office Stationers Private Limited',
    companyAddress:
      'C - 18, GR FLR, GHATKOPAR IND EST, NR AMRUT NAGAR, GHATKOPAR(W), MUMBAI - 86.',
    companyContact: '022 - 4120 0847 - 80800 21333',
    gstin: '27AAMCA5565B1ZO',
    state: 'Maharashtra',
    code: '27',
    customerName: 'ICICI BANK LTD. - MAHARASHTRA',
    noOfBoxes: 1,
    items: [
      {
        description: 'PENCIL ERASER-Natraj',
        qty: 6,
        gstRate: '5%',
        hsnSac: '40169200',
      },
      {
        description: 'Permanent Marker-Black',
        qty: 3,
        gstRate: '18%',
        hsnSac: '96082000',
      },
      {
        description: 'STAPLER PIN - KANGARO 10 -1M',
        qty: 20,
        gstRate: '18%',
        hsnSac: '83059090',
      },
    ],
    deliveryContact: {
      person: 'Manisha Poojary',
      phone: '8879167378',
      address:
        'ICICI BANK LTD. - MAHARASHTRA, 2779-KALAMBOLI, SECTOR 9E, KALAMBOLI, NAVI MUMBA, SHOP NO 6 & 7, PARTH SOLITIRE, KALAMBOLI-410218',
      email: 'manisha.poojary@icicibank.com',
      costCenter: '2779',
      gstNo: '27AAACI1195H1ZM',
    },
  };

  items: any[] = [
    { product: 'PENCIL ERASER-Natraj', hsn: '40169200', gstRate: 5, qty: 6 },
  ];

  total = signal(false);

  constructor() {}

  ngOnInit(): void {
    this.total.set(this.items.reduce((acc, item) => acc + item.qty, 0));
  }

  printPoster() {
    const printContent = document.getElementById('printSection')?.innerHTML;
    if (printContent) {
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow?.document.write(`
        <html>
        <head>
          <title>Print Poster</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .poster { width: 100%; border: 1px solid #ddd; padding: 10px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
            @media print { button { display: none; } }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
      printWindow?.close();
    }
  }
}
