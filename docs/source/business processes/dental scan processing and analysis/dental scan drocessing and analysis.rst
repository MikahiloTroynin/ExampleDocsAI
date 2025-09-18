NIR-Dental Scan Processing and Analysis
=======================================

Related Tasks
-------------

- NDAI-100: NIR Data Processing Module Development
- NDAI-101: CAD/CAM System Integration
- NDAI-102: AI Caries Analysis Implementation
- NDAI-103: HIPAA and GDPR Compliance Assurance
- NDAI-104: Multilingual Interface Development
- NDAI-105: Audit and Reporting System

General Information
-------------------

The "NIR-Dental Scan Processing and Analysis" business process is designed to automate the processing of dental scanner data using Near-Infrared (NIR) technology. The process ensures data collection, analysis, and visualization to support clinical decisions, integration with CAD/CAM systems for restoration manufacturing, and generation of clinical reports. The primary goal is to enhance diagnostic accuracy and treatment procedure efficiency through advanced technology. The process covers all stages from scan acquisition to the generation of a complete treatment plan, ensuring full compliance with international security and quality standards.

Preconditions
-------------

- Dental scanner with NIR module successfully connected to the system
- User (dentist or technician) successfully authenticated in the system with appropriate access rights
- Patient data (name, ID, treatment history) entered into the dental practice management system
- System connected to the internet for synchronization with the NIR-Dental AI Suite cloud service
- Scanner calibrated according to manufacturer recommendations
- Latest software version (v2.0 or newer) installed
- Required drivers for Bluetooth 5.2 and Wi-Fi 6E connections installed

BPMN 2.0 Business Process Diagram
---------------------------------

[BPMN 2.0 diagram will be added later]

Link to Diagram
---------------

Jira Task: https://jira.example.com/browse/NDAI-100

Source File of Diagram (BPMN 2.0)
---------------------------------

nir_dental_scan_process_v2.bpmn

Information Flow Diagram (Data Exchange Protocol Between Systems)
---------------------------------------------------------------

[Information flow diagram will be added later]

Business Rules
--------------

- All patient data must be encrypted using AES-256 during storage and transmission
- Full-arch scan processing time must not exceed 4 seconds (NFR-001)
- System must comply with HIPAA (USA) and GDPR (EU) standards for personal data protection
- All clinical reports must have a digital signature from the dentist before saving
- Caries detection accuracy must be at least 98% (FR-003)
- System must support a multilingual interface (English, Spanish, French, German, Chinese, Japanese)
- Access to patient data is restricted based on role (RBAC)
- All data changes must be logged in audit logs with detailed change descriptions
- System must automatically create data backups every 15 minutes
- Maximum system recovery time after interruption (RTO) must not exceed 1 hour

Process Outcome
---------------

After completion of the business process, the following are generated:

- Clinical report in PDF format with interactive 3D models
- CAD/CAM compatible files (STL, OBJ) for restoration manufacturing
- DICOM file with subgingival structures for further analysis
- HL7 FHIR report for integration with dental practice management systems
- Diagnostic accuracy report and treatment recommendations
- Automatically generated codes for insurance and procedure payments
- Complete historical record of the operation with metadata and timestamp

Electronic Documents
--------------------

- Clinical Report (PDF)
- DICOM file with scan
- STL/OBJ files for CAD/CAM systems
- HL7 FHIR report
- Caries report with heat maps
- Scan metadata in XML format
- Audit logs in JSON format
- Electronic signatures in PAdES format
- Encrypted data backups
- Operation reports for administrative accounting

Printed Documents
-----------------

- Printed clinical report for patient archive
- Signed report for patient delivery
- Caries report for the dentist
- Printed instruction for technical staff
- Acceptance and transfer certificate of processed results
- Signed report for insurance company
- Printed version of scan metadata for archive
- Operation statement for accounting
- Signed report for medical commission
- Printed version of caries heat map for patient
