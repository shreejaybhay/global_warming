import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

export async function GET() {
  try {
    // Create new PDF document
    const doc = new jsPDF();

    // Helper function to add page header
    const addPageHeader = () => {
      doc.setFillColor(220, 53, 69); // Red color for header
      doc.rect(0, 0, doc.internal.pageSize.width, 15, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text('Wildfire Prevention Guide', 10, 10);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.width - 40, 10);
      doc.setTextColor(0, 0, 0);
    };

    // Add cover page
    doc.setFillColor(220, 53, 69);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text('Wildfire Prevention', doc.internal.pageSize.width / 2, 80, { align: 'center' });
    doc.setFontSize(24);
    doc.text('Complete Guide', doc.internal.pageSize.width / 2, 100, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Created by Global Warming Prevention Team', doc.internal.pageSize.width / 2, 120, { align: 'center' });
    doc.text(`Last Updated: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.width / 2, 130, { align: 'center' });

    // Add new page for content
    doc.addPage();
    let y = 30;

    // Helper function to add sections with improved formatting
    const addSection = (title, content, startY) => {
      addPageHeader();
      doc.setFontSize(18);
      doc.setTextColor(220, 53, 69);
      doc.text(title, 20, startY);
      doc.setLineWidth(0.5);
      doc.line(20, startY + 2, doc.internal.pageSize.width - 20, startY + 2);
      doc.setTextColor(0, 0, 0);

      let currentY = startY + 15;
      return currentY;
    };

    // Add Table of Contents
    y = addSection('Table of Contents', [], y);
    doc.setFontSize(12);
    const sections = [
      '1. Understanding Wildfire Risk',
      '2. Creating Defensible Space',
      '3. Home Protection Measures',
      '4. Weather Monitoring',
      '5. Emergency Planning',
      '6. Evacuation Guidelines',
      '7. Emergency Contacts'
    ];
    sections.forEach((section, index) => {
      doc.text(section, 25, y);
      y += 10;
    });

    // Section 1: Understanding Wildfire Risk
    doc.addPage();
    y = addSection('1. Understanding Wildfire Risk', [], 30);
    doc.setFontSize(12);
    const riskFactors = [
      'High-Risk Conditions:',
      '• Low humidity and high temperatures',
      '• Strong winds and drought conditions',
      '• Dry vegetation and forest debris',
      '',
      'Common Ignition Sources:',
      '• Lightning strikes',
      '• Human activities (campfires, equipment)',
      '• Electrical infrastructure'
    ];
    riskFactors.forEach(factor => {
      doc.text(factor, 25, y);
      y += 8;
    });

    // Section 2: Creating Defensible Space
    doc.addPage();
    y = addSection('2. Creating Defensible Space', [], 30);
    doc.setFontSize(12);
    const zones = [
      'Zone 1 (0-30 feet from home):',
      '• Remove all dead vegetation',
      '• Keep grass mowed to 4 inches',
      '• Prune tree branches up to 6-10 feet',
      '• Remove leaves from gutters',
      '',
      'Zone 2 (30-100 feet from home):',
      '• Create fuel breaks with driveways',
      '• Keep grass height at 4-6 inches',
      '• Clear vegetation between trees',
      '',
      'Zone 3 (100+ feet from home):',
      '• Thin out vegetation',
      '• Remove dead trees and bushes',
      '• Break up continuous vegetation'
    ];
    zones.forEach(zone => {
      doc.text(zone, 25, y);
      y += 8;
    });

    // Section 3: Home Protection Measures
    doc.addPage();
    y = addSection('3. Home Protection Measures', [], 30);
    const protection = [
      'Structural Improvements:',
      '• Install fire-resistant roofing',
      '• Use ember-resistant vents',
      '• Install dual-pane windows',
      '• Use fire-resistant siding',
      '',
      'Regular Maintenance:',
      '• Clean gutters regularly',
      '• Repair loose shingles',
      '• Seal gaps and openings',
      '• Maintain irrigation systems'
    ];
    protection.forEach(item => {
      doc.text(item, 25, y);
      y += 8;
    });

    // Emergency Contacts (Final Page)
    doc.addPage();
    y = addSection('Emergency Contacts', [], 30);
    doc.setFontSize(14);
    doc.setTextColor(220, 53, 69);
    doc.text('24/7 Emergency Services:', 25, y);
    y += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    const contacts = [
      { name: 'Fire Emergency', number: '101' },
      { name: 'Forest Department', number: '1926' },
      { name: 'Disaster Management', number: '108' },
      { name: 'Police Control Room', number: '100' },
      { name: 'Ambulance Services', number: '102' }
    ];
    contacts.forEach(contact => {
      doc.text(`${contact.name}: ${contact.number}`, 30, y);
      y += 10;
    });

    // Convert the PDF to a blob
    const pdfOutput = doc.output('arraybuffer');

    return new NextResponse(pdfOutput, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=wildfire-prevention-guide.pdf',
        'Content-Length': pdfOutput.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}





