import requests


def get_epss_score(cve_id):

    try:

        url = f"https://api.first.org/data/v1/epss?cve={cve_id}"

        response = requests.get(url, timeout=10)

        data = response.json()

        if data.get("data"):

            return data["data"][0]

        return None

    except Exception as e:
        print(e)
        return None
