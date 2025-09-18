Product specification
======================

===================================================
NIR-Dental AI Suite Software Specification Document
===================================================

:Document ID: NDAI-SPC-002
:Version: 2.0
:Release Date: 2025-09-18
:Authors: Medical Technology Solutions Group
:Status: Released
:Document Type: Detailed Technical Specification

.. contents::
   :local:

1. Introduction
---------------

1.1 Purpose
~~~~~~~~~~~

This document provides a comprehensive technical specification for the NIR-Dental AI Suite, a clinically deployed medical device software product. It details all aspects of the system's design, functionality, and compliance with international standards. This document serves as the authoritative reference for maintenance, support, regulatory audits, and future development.

1.2 Scope
~~~~~~~~~

The NIR-Dental AI Suite is a fully deployed cloud-native software solution designed for dental professionals, providing advanced Near-Infrared (NIR) imaging capabilities, AI-driven diagnostics, and seamless integration with CAD/CAM systems. This specification covers all operational aspects of the currently deployed version (v2.0), including system architecture, functional and non-functional requirements, security protocols, compliance measures, and maintenance procedures.

1.3 Definitions, Acronyms, and Abbreviations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- **NIR**: Near-Infrared Imaging technology for subgingival tissue visualization
- **CAD/CAM**: Computer-Aided Design/Computer-Aided Manufacturing
- **DICOM**: Digital Imaging and Communications in Medicine
- **STL**: Stereolithography file format
- **HIPAA**: Health Insurance Portability and Accountability Act
- **FDA**: Food and Drug Administration
- **CE**: Conformité Européenne
- **ISO**: International Organization for Standardization
- **RBAC**: Role-Based Access Control
- **MTBF**: Mean Time Between Failures
- **PHI**: Protected Health Information
- **SOP**: Standard Operating Procedure
- **RTO**: Recovery Time Objective
- **RPO**: Recovery Point Objective
- **FHIR**: Fast Healthcare Interoperability Resources
- **WAF**: Web Application Firewall

1.4 References
~~~~~~~~~~~~~~

- IEEE 830-1998: IEEE Standard for Software Requirements Specifications
- ISO 13485:2016 Medical devices — Quality management systems
- FDA 21 CFR Part 820: Quality System Regulation
- GDPR: General Data Protection Regulation (EU)
- IDS 2025 Industry Standards for Dental Imaging
- ISO 14971:2019 Medical devices — Application of risk management to medical devices
- HIPAA Security Rule (45 CFR Part 160 and Subparts A and C of Part 164)
- ISO 12836-2:2019 Dental equipment — Intraoral scanning systems
- NIST FIPS 140-2: Security Requirements for Cryptographic Modules
- TLS 1.3 (RFC 8446)

1.5 Document History
~~~~~~~~~~~~~~~~~~~~

+----------+------------+-------------------------------------------------------------------------+
| Version  | Date       | Changes                                                                 |
+==========+============+=========================================================================+
| 1.0      | 2024-06-15 | Initial specification for development phase                             |
+----------+------------+-------------------------------------------------------------------------+
| 1.1      | 2024-09-01 | Added support for 3 new scanner models, improved AI model to v2.1       |
+----------+------------+-------------------------------------------------------------------------+
| 2.0      | 2025-09-18 | Major update with enhanced subgingival visualization, GDPR compliance   |
+----------+------------+-------------------------------------------------------------------------+

2. System Overview
------------------

2.1 Product Description
~~~~~~~~~~~~~~~~~~~~~~~

The NIR-Dental AI Suite is a fully deployed medical device software solution that enables dental professionals to capture, analyze, and visualize subgingival dental structures using Near-Infrared (NIR) technology. The system processes high-resolution 3D scan data from compatible intraoral scanners, providing real-time clinical insights through AI-driven diagnostics. It integrates seamlessly with existing dental practice management systems and CAD/CAM workflows, enhancing precision in restorative dentistry procedures.

2.2 System Architecture
~~~~~~~~~~~~~~~~~~~~~~~

The NIR-Dental AI Suite follows a cloud-native microservices architecture deployed on Amazon Web Services (AWS). The system consists of the following components:

- **Client Application**: A desktop application built using Electron framework with React frontend, supporting Windows 11 and macOS Ventura. The application communicates with the cloud backend via RESTful APIs.
- **API Gateway**: AWS API Gateway handling all client requests, authentication, and routing to microservices.
- **Microservices**:
  - **Auth Service**: Manages user authentication and RBAC using OAuth 2.0 and JWT tokens.
  - **Scan Processing Service**: Processes raw NIR scan data using proprietary denoising algorithms and deep learning models.
  - **AI Engine Service**: Hosts TensorFlow-based models (NIR-Net v2.1) for caries detection and tooth segmentation.
  - **CAD Integration Service**: Handles communication with CAD/CAM systems via standard protocols.
  - **Reporting Service**: Generates treatment reports and visualizations.
- **Database Layer**:
  - **RDS PostgreSQL**: For structured data (user accounts, scan metadata, treatment plans)
  - **Elasticsearch**: For search and indexing of scan data
- **Data Storage**:
  - **AWS S3**: Encrypted storage for scan data and reports, with lifecycle policies for archival
  - **AWS Glacier**: For long-term archival of historical data
- **Infrastructure**:
  - **AWS EKS**: Kubernetes cluster for container orchestration
  - **CloudFront**: CDN for global content delivery
  - **WAF**: Web Application Firewall for security

2.3 Key Features
~~~~~~~~~~~~~~~~

- Real-time subgingival visualization with 2mm penetration depth
- AI-powered caries detection with 98.2% accuracy
- Multi-platform compatibility (Windows, macOS, cloud)
- End-to-end encryption for data security
- Seamless integration with major dental practice management systems
- Automated treatment planning with CAD/CAM systems
- Comprehensive audit trails and compliance reporting

2.4 Deployment Model
~~~~~~~~~~~~~~~~~~~~

- **Cloud Deployment**: Primary model using AWS infrastructure across US East (N. Virginia) and EU Central (Frankfurt) regions
- **Hybrid Deployment**: Optional on-premise deployment for facilities with specific data sovereignty requirements
- **Scalability**: Auto-scaling groups handle peak loads (up to 100 concurrent users per clinic)

2.5 Supported Hardware and Software
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- **Intraoral Scanners**:
  - DentalEZ X1 (with NIR module)
  - 3Shape TRIOS 5 (NIR upgrade)
  - Planmeca Emerald S (NIR-enabled)
- **Operating Systems**:
  - Windows 11 (64-bit, version 22H2 or later)
  - macOS Ventura (13.0 or later)
- **Cloud Platforms**:
  - AWS (us-east-1, eu-central-1)
  - Azure (East US, West Europe) for hybrid deployments
  - Google Cloud Platform (us-east4, europe-west1) for EU-based clients

3. Detailed Functional Requirements
-----------------------------------

3.1 FR-001: Subgingival Structure Capture
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Description*: Capture subgingival structures using Near-Infrared technology with penetration depth up to 2mm below gum line.

*Input*: Raw NIR scan data from compatible intraoral scanners (e.g., DentalEZ X1, 3Shape TRIOS 5).

*Output*: Processed 3D point cloud data in DICOM format with subgingival structures visualized as color-coded layers.

*Processing Logic*:
- Raw NIR sensor data is preprocessed using a proprietary wavelet denoising algorithm.
- A convolutional neural network (NIR-Net v2.1) segments gingival tissue and underlying structures.
- The system applies geometric correction to account for light scattering in biological tissues.
- Final output is a DICOM file with specific metadata tags (e.g., SOP Class UID: 1.2.840.10008.5.1.4.1.1.77.1.6 for Subgingival Imaging).

*Error Handling*:
- If scan quality is insufficient (e.g., motion artifacts), the system prompts the user with specific guidance (e.g., "Increase scanner stability" or "Adjust scanning speed").
- Logs error code ERR_NIR_001 with timestamp and scan parameters for technical support.

3.2 FR-002: Real-time Visualization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Description*: Provide real-time visualization of NIR scan data with ≤300ms latency during clinical procedures.

*Input*: Live scan stream from intraoral scanner.

*Output*: Real-time 3D rendering on client application with ≤300ms latency.

*Processing Logic*:
- Data is processed in a pipeline with dedicated GPU acceleration (NVIDIA T4).
- The system uses progressive rendering to display initial results within 150ms, with refinement completing within 300ms.

*Performance Metrics*:
- Average latency: 245ms (measured across 100 clinical trials)
- 95th percentile latency: 298ms

*Error Handling*:
- If latency exceeds 350ms, the system displays a warning and suggests reducing scan resolution.

3.3 FR-003: AI-Powered Caries Detection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Description*: Implement AI-powered caries detection with ≥98% accuracy and automatic tooth segmentation.

*Input*: Processed NIR scan data in DICOM format.

*Output*: Annotated 3D model showing caries locations with probability scores, tooth segmentation boundaries.

*Processing Logic*:
- NIR-Net v2.1 model processes scan data through 12 convolutional layers.
- Uses attention mechanisms to focus on high-risk areas.
- Generates heatmaps overlaid on 3D models with confidence scores (0-100%).

*Validation Data*:
- Trained on 50,000 annotated clinical cases from 15 dental institutions
- Sensitivity: 98.7%, Specificity: 97.9%

*Error Handling*:
- For low-confidence detections (<85%), system flags for manual review
- Logs error code ERR_AI_003 with confidence metrics for audit trail

3.4 FR-004: File Format Support
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Description*: Support import/export of standard file formats (STL, OBJ, DICOM) with cloud-native data synchronization.

*Input*: Various file formats from external systems.

*Output*: Standardized internal representation and export to requested formats.

*Processing Logic*:
- STL/OBJ import: Converts mesh data to internal point cloud representation
- DICOM import: Extracts metadata and image data per DICOM standard
- Cloud synchronization: Automatic version control with conflict resolution

*File Format Specifications*:
- STL: Binary format with 16-bit precision
- OBJ: Wavefront format with texture mapping support
- DICOM: Compliant with PS3.3-2023 standards including private tags for NIR data

3.5 FR-005: CAD/CAM Integration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Description*: Integrate with CAD/CAM systems for designing crowns, bridges, and orthodontic appliances with sub-micron precision.

*Input*: Processed NIR scan data with subgingival structures.

*Output*: CAD/CAM compatible design files with subgingival margins.

*Integration Protocol*:
- Uses HL7 FHIR for treatment plan data exchange
- DICOM for image data transfer
- REST APIs for real-time communication

*Precision Requirements*:
- Margin detection accuracy: ±0.5 microns
- Tooth alignment precision: ±1.2 microns

3.6 FR-006: Treatment Report Generation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Description*: Generate detailed treatment reports with 3D visualizations of both supragingival and subgingival structures.

*Input*: Processed scan data, clinical notes, treatment plan.

*Output*: PDF report with interactive 3D models, clinical findings, and treatment recommendations.

*Report Structure*:
- Executive Summary
- Scan Quality Assessment
- Caries Detection Results
- Subgingival Structure Analysis
- Treatment Plan Visualization
- Compliance Certification

*Data Visualization*:
- Interactive 3D viewer with layer toggling (supragingival/subgingival)
- Heatmaps showing caries probability
- Cross-section views with measurement tools

3.7 FR-007: Multi-language Support
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Description*: Enable multi-language support (English, Spanish, French, German, Mandarin, Japanese) with contextual UI adaptation.

*Implementation*:
- All UI elements localized using i18next framework
- Right-to-left language support for Arabic (future release)
- Contextual translation for dental terminology
- Automatic language detection based on system settings

*Supported Languages*:
- English (en-US)
- Spanish (es-ES)
- French (fr-FR)
- German (de-DE)
- Mandarin (zh-CN)
- Japanese (ja-JP)

4. Non-Functional Requirements
------------------------------

4.1 NFR-001: Performance
~~~~~~~~~~~~~~~~~~~~~~~~

*Metric*: Full-arch scanning processing time ≤4 seconds with 10-micron accuracy.

*Test Methodology*: Measured using standardized dental arch models (ISO 12836-2) across 100 test cases.

*Results*:
- Average processing time: 3.2 seconds
- 95th percentile: 3.8 seconds
- Average accuracy: 9.7 microns
- Throughput: 12 full-arch scans per minute

*Conditions*: Tested on AWS c5.4xlarge instance with 16 vCPUs, 32 GB RAM, NVIDIA T4 GPU.

4.2 NFR-002: Security
~~~~~~~~~~~~~~~~~~~~~

*Encryption*:
- Data at rest: AES-256 encryption for all stored data (S3, RDS)
- Data in transit: TLS 1.3 for all communications; certificates managed by AWS ACM

*Access Control*:
- RBAC with 4 roles:
  - Admin: Full system access
  - Dentist: Patient data access, treatment planning
  - Technician: CAD/CAM design access only
  - Administrator: System configuration only
- MFA required for all user accounts (TOTP or biometric)
- Session timeout: 15 minutes of inactivity

*Audit Logs*:
- All user actions logged with timestamp, user ID, action type, and affected data
- Logs retained for 7 years in compliance with HIPAA
- Logs stored in AWS CloudTrail with immutable storage
- Automated alerts for suspicious activity (e.g., multiple failed logins)

*Penetration Testing*:
- Conducted by Cure53 in Q3 2024
- 0 critical vulnerabilities found; all medium/high issues resolved

4.3 NFR-003: Reliability
~~~~~~~~~~~~~~~~~~~~~~~~

*Uptime*: 99.95% system uptime during clinical operations

*Failover*: Automatic failover to secondary region within 30 seconds during outages

*MTBF*: 1,200 hours (based on historical data from 2024)

*Disaster Recovery*:
- RTO (Recovery Time Objective) ≤ 1 hour
- RPO (Recovery Point Objective) ≤ 5 minutes
- Backup strategy: Daily snapshots with 30-day retention

4.4 NFR-004: Usability
~~~~~~~~~~~~~~~~~~~~~~

*Training Requirements*: Intuitive interface requiring ≤90 minutes of training for dental professionals.

*User Testing Results*:
- 98% of dental professionals completed training within 65-85 minutes
- Average task completion time for common workflows:
  - Scan processing: 1.2 minutes
  - Caries detection review: 2.3 minutes
  - Treatment report generation: 3.1 minutes

*Accessibility Features*:
- WCAG 2.1 AA compliance
- Screen reader support
- High-contrast mode
- Keyboard navigation

4.5 NFR-005: Compatibility
~~~~~~~~~~~~~~~~~~~~~~~~~~

*Operating Systems*:
- Windows 11 (64-bit, version 22H2 or later)
- macOS Ventura (13.0 or later)

*Cloud Platforms*:
- AWS (us-east-1, eu-central-1)
- Azure (East US, West Europe)
- Google Cloud Platform (us-east4, europe-west1)

*Scanner Compatibility*:
- DentalEZ X1 (firmware v3.2+)
- 3Shape TRIOS 5 (NIR upgrade v2.0+)
- Planmeca Emerald S (firmware v5.1+)

5. System Architecture Details
------------------------------

5.1 Component Diagram
~~~~~~~~~~~~~~~~~~~~~

[Text description of the component diagram]

- Client Application ↔ API Gateway (AWS)
- API Gateway → Auth Service, Scan Processing Service, AI Engine, CAD Integration, Reporting Service
- Each microservice connects to shared database and storage
- Data flow: Scanner → Client → API Gateway → Microservices → Database/Storage

5.2 Data Flow
~~~~~~~~~~~~~

1. Scanner captures raw NIR data → transmitted via Bluetooth 5.2 to client app
2. Client app sends data to API Gateway
3. API Gateway routes to Scan Processing Service
4. Scan Processing Service processes data and sends to AI Engine
5. AI Engine returns processed data to Scan Processing Service
6. Results stored in S3 and RDS
7. Client app retrieves processed data via API for display

5.3 Technology Stack
~~~~~~~~~~~~~~~~~~~~

- Frontend: React, Electron, Three.js for 3D rendering
- Backend: Python (FastAPI), Node.js for microservices
- AI Models: TensorFlow 2.12, PyTorch 2.0
- Database: PostgreSQL 14, Elasticsearch 8.10
- Cloud: AWS EKS, S3, RDS, CloudFront, WAF
- Infrastructure as Code: Terraform, AWS CDK
- Monitoring: AWS CloudWatch, Datadog
- CI/CD: GitHub Actions, Jenkins

6. Integration Details
----------------------

6.1 CAD/CAM Integration
~~~~~~~~~~~~~~~~~~~~~~~

- **Supported Systems**:
  - 3Shape Dental System (v2024.1+)
  - Cerec Omnicam (v6.5+)
  - Dental Wings (v2024)
- **Integration Protocol**:
  - DICOM for image exchange
  - HL7 FHIR for treatment plan data
  - REST APIs for real-time communication
- **Data Mapping**:
  - Tooth segmentation data mapped to CAD/CAM tooth numbering system
  - Subgingival structures visualized as semi-transparent layers in CAD software
  - Margin detection data exported as STL with custom attributes

6.2 Practice Management Systems
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- **Supported Systems**:
  - Dentrix G5 (API v3.1)
  - Eaglesoft 2024
  - Open Dental (v24.0+)
- **Integration Points**:
  - Patient demographics synchronization
  - Treatment plan import/export
  - Scan data attachment to patient records
  - Billing code generation for NIR procedures

7. Security and Compliance
--------------------------

7.1 Data Protection
~~~~~~~~~~~~~~~~~~~

- **Encryption Standards**:
  - AES-256 for data at rest (NIST FIPS 140-2 compliant)
  - TLS 1.3 for data in transit (RFC 8446)
  - Key management via AWS KMS with automatic rotation

- **Data Residency**:
  - US data stored in us-east-1 region
  - EU data stored in eu-central-1 region
  - Data never leaves designated geographic boundaries

7.2 Regulatory Compliance
~~~~~~~~~~~~~~~~~~~~~~~~~

- **HIPAA Compliance**:
  - All PHI encrypted and access-controlled
  - Business Associate Agreement (BAA) with AWS
  - Regular risk assessments per 45 CFR § 164.308(a)(1)(ii)(D)
  - Audit logs retained for 6 years

- **GDPR Compliance**:
  - Data processing agreements with cloud providers
  - Right to erasure implemented via automated data deletion workflows
  - Data portability via export in JSON format
  - Privacy Impact Assessments conducted quarterly

- **FDA 21 CFR Part 820**:
  - Design controls documented per § 820.30
  - Validation of software per § 820.70(i)
  - Complaint handling per § 820.198
  - Device history records maintained for 10 years

- **ISO 13485:2016**:
  - Quality management system certified
  - Design validation per clause 7.3.6
  - Risk management per ISO 14971:2019

8. Testing and Validation
-------------------------

8.1 Validation Protocol
~~~~~~~~~~~~~~~~~~~~~~~

- **ISO 13485:2016 Compliance**: All validation activities follow clause 7.3.6
- **FDA 21 CFR Part 820**: Software validation per § 820.30(g)
- **Test Coverage**: 98% code coverage, including all critical paths

8.2 Clinical Validation
~~~~~~~~~~~~~~~~~~~~~~~

- **Study Design**: Prospective study across 10 dental clinics (5 US, 5 EU)
- **Participants**: 50 dentists, 1,000 patient scans
- **Results**:
  - Caries detection accuracy: 98.2% (CI 95-99.5%)
  - Subgingival structure mapping precision: 9.7 microns (SD 0.3)
  - User satisfaction score: 4.7/5
  - Diagnostic confidence improvement: 32% compared to traditional methods

8.3 Performance Testing
~~~~~~~~~~~~~~~~~~~~~~~

- **Load Test**: 50 concurrent users for 24 hours
- **Results**: 99.95% uptime, average response time 1.2s
- **Stress Test**: 150% of expected peak load for 8 hours
- **Results**: System maintained stability with graceful degradation

8.4 Security Testing
~~~~~~~~~~~~~~~~~~~~

- **Penetration Test**: Conducted by Cure53 (Q3 2024)
- **Findings**: 0 critical vulnerabilities, 3 medium issues resolved
- **Vulnerability Management**: All issues patched within 72 hours

9. Maintenance and Support
--------------------------

9.1 Update Procedures
~~~~~~~~~~~~~~~~~~~~~

- **Patch Management**: Monthly security patches
- **Major Updates**: Quarterly releases with new features
- **Rollback Procedure**: Automated rollback to previous version if critical issues detected
- **Change Control**: All changes reviewed by Change Control Board

9.2 Support SLA
~~~~~~~~~~~~~~~

- **Response Time**:
  - Critical issues: ≤ 1 hour
  - High priority: ≤ 4 hours
  - Medium priority: ≤ 24 hours
  - Low priority: ≤ 5 business days
- **Availability**: 24/7 support via web portal and dedicated phone line
- **Escalation Path**: 
  - Level 1: Technical support
  - Level 2: Engineering team
  - Level 3: Product architects

9.3 Troubleshooting Guide
~~~~~~~~~~~~~~~~~~~~~~~~~

- **Common Issues and Solutions**:
  - Low scan quality: Check scanner calibration, clean lens, ensure proper lighting
  - High latency: Ensure Wi-Fi 6E connection, reduce concurrent users, check network bandwidth
  - Integration errors: Verify API keys and system versions, check firewall rules
  - Data sync failures: Check cloud connectivity, verify storage quotas

10. Version History
-------------------

+----------+------------+-------------------------------------------------------------------------+
| Version  | Date       | Changes                                                                 |
+==========+============+=========================================================================+
| 1.0      | 2024-06-15 | Initial release with core features                                      |
+----------+------------+-------------------------------------------------------------------------+
| 1.1      | 2024-09-01 | Added support for 3 new scanner models, improved AI model to v2.1       |
+----------+------------+-------------------------------------------------------------------------+
| 2.0      | 2025-09-18 | Major update with enhanced subgingival visualization, GDPR compliance   |
+----------+------------+-------------------------------------------------------------------------+

11. Appendices
--------------

11.1 Appendix A: API Specifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- **Scan Processing API**:
  - Endpoint: /v1/scan/process
  - Method: POST
  - Request:
    {
      "scanner_id": "DE-X1-001",
      "scan_data": "base64_encoded_data",
      "patient_id": "PAT-12345",
      "scan_type": "full_arch"
    }
  - Response:
    {
      "task_id": "T-87654321",
      "status": "processing",
      "estimated_time": 45
    }

- **Report Generation API**:
  - Endpoint: /v1/report/generate
  - Method: POST
  - Request:
    {
      "scan_id": "S-98765432",
      "report_type": "clinical",
      "language": "en-US"
    }
  - Response:
    {
      "report_id": "R-12345678",
      "pdf_url": "https://api.nirdental.ai/reports/R-12345678.pdf",
      "expires_at": "2025-09-25T14:30:00Z"
    }

11.2 Appendix B: Sample Data Formats
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- **DICOM Metadata Example**:
  - SOP Class UID: 1.2.840.10008.5.1.4.1.1.77.1.6
  - Patient Name: Doe^John
  - Study Description: Subgingival NIR Scan
  - Series Description: Full Arch Scan
  - Manufacturer: NIR-Dental AI Suite
  - Private Tag (0029,1001): NIR_Penetration_Depth=2.0mm
  - Private Tag (0029,1002): Caries_Detection_Accuracy=98.2%

- **STL Export Specification**:
  - Vertex precision: 16-bit float
  - Normal vectors: Included
  - Color information: RGB values for caries probability
  - Custom attributes: 
    - "subgingival": "true"
    - "margin_confidence": "0.97"

11.3 Appendix C: Compliance Certificates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- FDA 510(k) Clearance Number: K240012
- CE Marking Certificate: CE 0456-2024
- ISO 13485 Certificate: ISO-13485-2024-001
- HIPAA Compliance Verification: HHS-2024-001
- GDPR Compliance Audit: EU-GDPR-2024-007

11.4 Appendix D: User Interface Mockups
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[Description of UI components with references to design documents]

- **Main Dashboard**:
  - Left panel: Patient list with scan status indicators
  - Center: Interactive 3D viewer with layer controls
  - Right panel: Clinical findings summary and treatment recommendations

- **Scan Processing View**:
  - Real-time progress bar with estimated completion time
  - Quality assessment indicators (motion, lighting, stability)
  - Manual adjustment tools for scan alignment

- **Treatment Report View**:
  - Tabbed interface for different report sections
  - Export options (PDF, DICOM, HL7 FHIR)
  - Digital signature field for clinician approval
```
