import fitz
import os
import uuid


DEFAULT_OUTPUT_DIR = "assets"

SMALL_IMAGE_THRESHOLD = 32


def extract_assets(
    file_path: str,
    output_dir: str = None
):

    if output_dir is None:
        output_dir = DEFAULT_OUTPUT_DIR

    os.makedirs(
        output_dir,
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
        for image in images:
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

            pixmap = fitz.Pixmap(
                document,
                xref
            )
            width = pixmap.width
            height = pixmap.height

            if (
                width < SMALL_IMAGE_THRESHOLD
                or height < SMALL_IMAGE_THRESHOLD
            ):
                continue

            filename = (
                f"{uuid.uuid4()}.{extension}"
            )
            output_path = os.path.join(
                output_dir,
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
                "type": "image",
                "path": os.path.abspath(output_path),
                "page": page_index + 1,
                "width": width,
                "height": height,
                "extension": extension,
                "size": len(image_bytes)
            })

    return assets