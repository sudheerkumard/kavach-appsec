from pathlib import Path
import matplotlib.pyplot as plt

REPORT_DIR = Path("reports")
REPORT_DIR.mkdir(exist_ok=True)

def generate_vulnerability_chart(data):

```
chart_path = REPORT_DIR / "vulnerability_chart.png"

labels = list(data.keys())
values = list(data.values())

plt.figure(figsize=(6,6))
plt.pie(
    values,
    labels=labels,
    autopct="%1.1f%%"
)

plt.title(
    "Vulnerability Distribution"
)

plt.savefig(chart_path)

plt.close()

return str(chart_path)
```
