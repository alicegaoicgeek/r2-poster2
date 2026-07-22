---
source: IP_swiss.png
extractor: vision
---

# Idea → Set of Functions → Top-Level RTL plus SW

## Idea

| Requirements | Specification | SystemC, [...] | Specification + Extensions | NML, LISA, LLVM | UML/SysML | Specification | Requirements |
|---|---|---|---|---|---|---|---|
| Dedicated Hardware | Dedicated Hardware | Dedicated Hardware | Configurable Extensible Processor | Application Specific Processor (ASIP) | Fixed Processor IP | Fixed Processor IP | Fixed Processor IP |
| HW Re-use from IP Libraries | Manual Coding | High-Level Synthesis | Re-use, configuration & extension | (Co)-Processor Synthesis | Software Synthesis | Manual SW Development | SW Re-use from IP Libraries |
| re-used RTL | new RTL | new RTL | new RTL+ new SW | new RTL+ new SW | re-used RTL+ new SW | re-used RTL+ new SW | re-used RTL+ re-used SW |

## Set of Functions

| Written Specification | GUI, IP-XACT | Interface Spec | Written Specification |
|---|---|---|---|
| Manual Assembly | Automated Assembly | Interface Synthesis | Network on Chip |

## Top-Level RTL plus SW

R2 芯片智能体
