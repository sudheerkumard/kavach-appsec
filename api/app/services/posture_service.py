def calculate_posture(findings):

    critical = len([
        f for f in findings
        if f["severity"] == "CRITICAL"
    ])

    high = len([
        f for f in findings
        if f["severity"] == "HIGH"
    ])

    score = 100 - (critical * 15) - (high * 5)

    if score < 0:
        score = 0

    return score