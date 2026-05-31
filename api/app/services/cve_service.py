import requests

def get_cve_intelligence(cve_id: str):

    result = {
        "cve": cve_id,
        "cvss": None,
        "cwe": None,
        "description": None,
        "published": None,
        "epss": None,
        "exploitability": "UNKNOWN",
        "remediation": None,
    }

    try:

        nvd_url = (
            f"https://services.nvd.nist.gov/rest/json/cves/2.0"
            f"?cveId={cve_id}"
        )

        nvd = requests.get(
            nvd_url,
            timeout=15
        ).json()

        vuln = nvd["vulnerabilities"][0]["cve"]

        result["description"] = (
            vuln["descriptions"][0]["value"]
        )

        result["published"] = vuln.get(
            "published"
        )

        weaknesses = vuln.get(
            "weaknesses",
            []
        )

        if weaknesses:

            result["cwe"] = (
                weaknesses[0]["description"][0]["value"]
            )

        metrics = vuln.get(
            "metrics",
            {}
        )

        if "cvssMetricV31" in metrics:

            cvss = metrics["cvssMetricV31"][0]

            result["cvss"] = (
                cvss["cvssData"]["baseScore"]
            )

            result["exploitability"] = (
                cvss["exploitabilityScore"]
            )

    except Exception as e:

        result["description"] = str(e)

    try:

        epss = requests.get(
            f"https://api.first.org/data/v1/epss?cve={cve_id}",
            timeout=10
        ).json()

        if epss["data"]:

            result["epss"] = (
                epss["data"][0]["epss"]
            )

    except:
        pass

    return result