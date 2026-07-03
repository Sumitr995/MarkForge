import sys
from markitdown import MarkItDown


def convert_pdf(file_path: str):

    md = MarkItDown()

    result = md.convert(file_path)

    return result.text_content



if __name__ == "__main__":

    if len(sys.argv) < 2:
        print("PDF path is required")
        sys.exit(1)


    pdf_path = sys.argv[1]


    try:

        markdown = convert_pdf(pdf_path)

        print(markdown)


    except Exception as error:

        print(
            f"Conversion failed: {error}",
            file=sys.stderr
        )

        sys.exit(1)