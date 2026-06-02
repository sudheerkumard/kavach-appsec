def calculate_cvss(severity):

    mapping = {
        "CRITICAL": 9.8,
        "HIGH": 8.1,
        "MEDIUM": 5.5,
        "LOW": 2.1
    }

    return mapping.get(severity.upper(), 0)
