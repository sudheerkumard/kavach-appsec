from jira import JIRA


JIRA_SERVER = "https://yourcompany.atlassian.net"
JIRA_EMAIL = "admin@company.com"
JIRA_API_TOKEN = "YOUR_API_TOKEN"


def create_jira_ticket(title, description):

    jira = JIRA(
        server=JIRA_SERVER,
        basic_auth=(JIRA_EMAIL, JIRA_API_TOKEN)
    )

    issue_dict = {
        "project": {"key": "SEC"},
        "summary": title,
        "description": description,
        "issuetype": {"name": "Bug"},
    }

    issue = jira.create_issue(fields=issue_dict)

    return issue.key