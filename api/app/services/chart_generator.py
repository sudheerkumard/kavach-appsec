import matplotlib.pyplot as plt


def vulnerability_chart(critical, high, medium, low):

    labels = [
        "Critical",
        "High",
        "Medium",
        "Low"
    ]

    values = [
        critical,
        high,
        medium,
        low
    ]

    plt.figure(figsize=(6, 6))

    plt.pie(
        values,
        labels=labels,
        autopct="%1.1f%%"
    )

    plt.title(
        "Vulnerability Distribution"
    )

    filename = "vulnerability_chart.png"

    plt.savefig(filename)

    plt.close()

    return filename


def repository_risk_chart(repositories):

    names = [
        r["name"]
        for r in repositories
    ]

    scores = [
        r["score"]
        for r in repositories
    ]

    plt.figure(figsize=(8, 4))

    plt.bar(
        names,
        scores
    )

    plt.title(
        "Repository Risk Ranking"
    )

    plt.ylabel(
        "Risk Score"
    )

    filename = "repository_risk_chart.png"

    plt.savefig(filename)

    plt.close()

    return filename


def license_chart(data):

    labels = list(data.keys())

    values = list(data.values())

    plt.figure(figsize=(6, 6))

    plt.pie(
        values,
        labels=labels,
        autopct="%1.1f%%"
    )

    plt.title(
        "License Distribution"
    )

    filename = "license_chart.png"

    plt.savefig(filename)

    plt.close()

    return filename
def vulnerable_components_chart(components):

    names = [
        c["name"]
        for c in components[:10]
    ]

    vulnerabilities = [
        c["vulnerabilities"]
        for c in components[:10]
    ]

    plt.figure(figsize=(10, 5))

    plt.bar(
        names,
        vulnerabilities
    )

    plt.title(
        "Top Vulnerable Components"
    )

    plt.ylabel(
        "Vulnerabilities"
    )

    plt.xticks(rotation=45)

    filename = "vulnerable_components_chart.png"

    plt.tight_layout()

    plt.savefig(filename)

    plt.close()

    return filename
def risk_trend_chart():

    import matplotlib.pyplot as plt

    months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun"
    ]

    scores = [
        85,
        75,
        68,
        60,
        52,
        45
    ]

    plt.figure(figsize=(8, 4))

    plt.plot(
        months,
        scores,
        marker="o"
    )

    plt.title(
        "Supply Chain Risk Trend"
    )

    plt.ylabel(
        "Risk Score"
    )

    filename = "risk_trend_chart.png"

    plt.savefig(filename)

    plt.close()

    return filename