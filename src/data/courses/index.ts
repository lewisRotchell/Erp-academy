import type { Subject } from '../../types';
import { lessons } from './accounting';
export { lessons };
const outline = (title: string, names: string[]) => ({title,lessons:names.map((name,i)=>({id:`${title.toLowerCase().replaceAll(' ','-')}-${i}`,title:name}))});
export const subjects: Subject[] = [
{id:'accounting',title:'Accounting & Finance',description:'Understand the numbers behind every business decision.',icon:'Landmark',color:'sage',modules:[{title:'Accounting Fundamentals',lessons:lessons.map(({id,title})=>({id,title}))},outline('Financial Controls',['Bank reconciliation','Period-end close','Audit trails'])]},
{id:'sales',title:'Sales & CRM',description:'From first conversation to a lasting customer relationship.',icon:'Users',color:'blue',modules:[outline('Customer to Cash',['Customer records & credit limits','Quotes & sales orders','Pricing, discounts & returns'])]},
{id:'purchasing',title:'Purchasing & Suppliers',description:'Build a reliable, well-controlled supply chain.',icon:'ShoppingCart',color:'peach',modules:[outline('Procure to Pay',['Supplier onboarding','Purchase approvals','Three-way matching'])]},
{id:'inventory',title:'Inventory Management',description:'Know what you hold, what it costs and when to reorder.',icon:'Package',color:'purple',modules:[outline('Stock Fundamentals',['SKUs & units of measure','Inventory valuation','Reorder points & stock allocation'])]},
{id:'warehouse',title:'Warehouse Operations',description:'Connect physical movement to dependable digital records.',icon:'Warehouse',color:'blue',modules:[outline('Warehouse Flow',['Receiving & putaway','Picking, packing & dispatch','Stocktakes & adjustments'])]},
{id:'architecture',title:'ERP Architecture & Business Rules',description:'Translate real business processes into robust software.',icon:'Workflow',color:'sage',modules:[outline('Designing Business Systems',['State machines & invariants','Idempotency & auditability','Permissions & approval workflows'])]},
{id:'xero',title:'Xero Integration',description:'Keep operations and the accounting ledger in sync.',icon:'RefreshCw',color:'peach',modules:[outline('Connected Accounting',['ERP versus ledger responsibilities','Contacts, invoices & tax codes','Sync, retries & reconciliation'])]},
{id:'reporting',title:'Reporting & Business Operations',description:'Turn operational data into useful business decisions.',icon:'ChartNoAxesCombined',color:'purple',modules:[outline('Business Visibility',['Operational KPIs','Margin & cash reporting','Data quality & reconciliation'])]}
];
export const glossary = [
...lessons.flatMap(l=>l.concepts.map(c=>({...c,lessonId:l.id,example:l.example}))),
{term:'SKU',definition:'Stock keeping unit: a unique internal identifier for a stocked product.',example:'Battery Direct assigns BAT-AA-24 to a pack of 24 AA batteries.',lessonId:undefined},
{term:'Sales Order',definition:'A record of a customer’s agreed request for goods or services.',example:'A garage orders 100 batteries; the order drives allocation and fulfilment.',lessonId:undefined},
{term:'Stock Allocation',definition:'Reserving available inventory for a specific demand without necessarily moving it.',example:'Battery Direct allocates 40 batteries to a garage’s order, reducing availability for other orders.',lessonId:undefined}
].filter((v,i,a)=>a.findIndex(x=>x.term===v.term)===i);
