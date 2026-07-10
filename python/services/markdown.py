from markitdown import MarkItDown



def extract_markdown(
    file_path: str
):


    converter = MarkItDown()


    result = converter.convert(
        file_path
    )


    return result.text_content