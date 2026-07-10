import fitz
import os
import uuid


OUTPUT_DIR = "assets/extracted"
def extract_assets(
    file_path: str
):

    os.makedirs(
        OUTPUT_DIR,
        exist_ok=True
    )

    document = fitz.open(
        file_path
    )
    assets = []
    for page_index in range(
        len(document)
    ):
        page = document[
            page_index
        ]
        images = page.get_images(
            full=True
        )
        for image_index, image in enumerate(
            images
        ):
            xref = image[0]
            extracted = document.extract_image(
                xref
            )
            image_bytes = extracted[
                "image"
            ]
            extension = extracted[
                "ext"
            ]
            filename = (
                f"{uuid.uuid4()}.{extension}"
            )
            output_path = os.path.join(
                OUTPUT_DIR,
                filename
            )
            with open(
                output_path,
                "wb"
            ) as file:
                file.write(
                    image_bytes
                )
            assets.append({

                    "type":
                    "image",

                    "path":
                    output_path,

                    "page":
                    page_index + 1
                })

    return assets