from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet


def generate_pdf_report(output_path, findings):

    doc = SimpleDocTemplate(output_path)

    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph(
            "Kavach Executive Security Report",
            styles["Title"]
        )
    )

    story.append(Spacer(1, 20))

    for finding in findings[:20]:

        story.append(
            Paragraph(
                f"{finding['title']} - {finding['severity']}",
                styles["BodyText"]
            )
        )

        story.append(Spacer(1, 12))

    doc.build(story)
