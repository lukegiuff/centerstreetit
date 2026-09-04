---
title: Subprocessors and AI Tools
description: The AI tools Center Street I.T. engages directly and the vendors we
  use to deliver managed services, with links to those vendors' own subprocessor
  disclosures.
slug: subprocessors
last_updated: 2026-09-04T00:00:00.000-05:00
---
## Why this page exists

Subsection 8.4 of our Master Services Agreement commits us to publishing and
maintaining this page. It lists two things:

1. The artificial intelligence tools we engage directly, and
2. The vendors we use to deliver managed services, with links to those vendors'
   own published subprocessor disclosures.

We update this page when the list changes. See **Notice of changes** below for
how and when we tell you.

This page covers vendors used to deliver services to our clients. It does not
cover our internal business tools — accounting, marketing, and design software —
which do not process client systems or client data.

## A. AI tools we engage directly

We engage one AI provider directly.

### Anthropic PBC — Claude

**What we use it for.** Documentation drafting, ticket summarization and triage,
script and configuration drafting, log and alert analysis, report generation,
and correspondence.

**Client data it may process.** Ticket text, configuration excerpts, log and
alert excerpts, network and system documentation, and correspondence that our
engineers submit in the course of performing the Services.

**Terms we operate under.** Anthropic's Commercial Terms of Service, through a
Claude for Work subscription. Anthropic's Commercial Terms are separate from its
Consumer Terms and expressly exclude Claude for Work from consumer data-training
practices.

**Model training.** Anthropic does not use data submitted under its Commercial
Terms to train its models.

**Retention.** As stated in Anthropic's Commercial Terms and privacy
documentation. Conversations are retained only as long as necessary to deliver
the service or as required by law.

**Confidentiality.** Governed by Anthropic's Commercial Terms of Service.

**Where to verify this yourself:**

* [Anthropic Trust Center](https://trust.anthropic.com)
* [Commercial Terms of Service](https://www.anthropic.com/legal/commercial-terms)
* [Privacy Policy](https://www.anthropic.com/legal/privacy)

### What we submit, and what we do not

We limit what we put in front of an AI tool to what the task requires. We do not
submit:

* Credentials, keys, certificates, or the contents of password vaults
* Backup images or full mailbox or file-share contents
* Complete exports of client databases or directory services

All AI-assisted output affecting client systems is reviewed by a Center Street
I.T. engineer before implementation. No change to a client's production systems,
security configuration, or data is made on the output of an AI tool alone.

## B. Vendors we use to deliver services

These vendors hold or process client data as part of how we deliver managed
services. Each maintains its own published disclosure of the subprocessors it
engages beneath us; we link those below. We do not control and do not
independently verify those vendors' subprocessor arrangements.

| Vendor | Role in service delivery | Client data it may process | Their subprocessor / trust page |
| ------ | ------------------------ | -------------------------- | ------------------------------- |
| **Kaseya (Datto RMM)** | Remote monitoring, patching, and remote access to managed endpoints | Device inventory and telemetry, remote session content, installed software | [Kaseya Trust Center](https://trust.kaseya.com) |
| **Kaseya (Autotask PSA)** | Ticketing, service records, contracts, and time entry | Contact details, ticket contents, service history | [Kaseya Trust Center](https://trust.kaseya.com) |
| **Trend Micro** | Endpoint, server, and email security | Email content and metadata, file and threat telemetry, quarantined items | [Trend Micro subprocessors](https://www.trendmicro.com/en_us/about/trust-center/privacy/subprocessors.html) |
| **Acronis** | Backup and recovery | Full backup images and file data for protected systems | [Acronis legal](https://www.acronis.com/en-us/legal/) |
| **Hudu** | Client documentation and knowledge base | Network diagrams, asset records, configuration documentation, credential records | [Hudu subprocessors](https://support.hudu.com/hc/en-us/articles/11414114448407-Hudu-GDPR-Subprocessors) |
| **Cisco (Duo)** | Multi-factor authentication | User identity records, authentication and device posture logs | None |
| **Microsoft** | Microsoft 365 tenant services under our Cloud Solution Provider relationship | Email, files, identity, and any data the client places in the tenant | [Microsoft data access](https://www.microsoft.com/en-us/trust-center/privacy/data-access) |
| **TD SYNNEX** | Indirect Cloud Solution Provider distributor for Microsoft and other subscriptions | Tenant and licensing identifiers, subscription and billing records | None |
| **SonicWall** | Cloud management of managed firewalls | Firewall configuration, connection and threat logs | [SonicWall sub-processors](https://www.sonicwall.com/legal/sub-processors) |

### AI engaged by the vendors above

Some vendors in this table engage their own AI subprocessors under their own
terms. We do not select or control those arrangements. Of particular note for
clients using Microsoft 365 Copilot: Microsoft discloses third-party AI
subprocessors used in Copilot experiences, and some are enabled by default at
the tenant level. Clients with governance or regulatory restrictions on AI
processing should review the current disclosure and tell us if a restriction
applies, under Section E below.

## C. Notice of changes

**New AI tools we engage directly.** We give clients at least thirty (30) days'
written notice before we begin using a new AI tool that we contract for
directly. The tool appears on this page when notice is given.

**AI engaged by our platform vendors.** The vendors listed in Section B may add
or change their own AI subprocessors under their own terms. We do not control
those decisions and are not always told in advance. We update this page as
promptly as practicable after we become aware of a change.

**Everything else.** Changes to the vendors in Section B are reflected here when
they take effect.

## D. What we do not do

* We do not sell client data.
* We do not permit the AI providers we engage directly to train their models on
  client data.
* We do not make changes to client production systems, security configuration,
  or data based solely on AI output.

## E. Client restrictions

If your regulatory obligations, insurance requirements, or agreements with your
own customers restrict or prohibit AI processing of your data, tell us in
writing and identify the restriction. We will make commercially reasonable
efforts to accommodate it. Where we cannot deliver a service under that
restriction, either of us may terminate the affected services on thirty (30)
days' notice without early termination charges.

## Questions

**Center Street I.T.**\
Phone: (346) 877-9001\
Email: support@centerstreetit.com\
PO Box 1021, Deer Park, TX 77536
