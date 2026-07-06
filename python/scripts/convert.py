import sys
import json
import unicodedata
from markitdown import MarkItDown

def clean_text(text: str):

    replacements = {
        "\ufffd": "-",
        "•": "-",
    }
    
    for old, new in replacements.items():

        text = text.replace(
            old,
            new
        )
        
    text = unicodedata.normalize(
        "NFKC",
        text
    )
    return text

def convert_pdf(file_path: str):
    md = MarkItDown()
    result = md.convert(file_path)
    cleaned = clean_text(
        result.text_content
    )
    return cleaned

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(
            json.dumps(
                {
                    "success": False,
                    "error": "PDF path required"
                }
            )
        )
        sys.exit(1)
        
    pdf_path = sys.argv[1]
    try:
        markdown = convert_pdf(
            pdf_path
        )
        print(
            json.dumps(
                {
                    "success": True,
                    "markdown": markdown
                },
                ensure_ascii=False
            )
        )
    except Exception as error:
        print(
            json.dumps(
                {
                    "success": False,

                    "error": str(error)
                }
            ),
            file=sys.stderr
        )
        sys.exit(1)