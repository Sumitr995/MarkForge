import sys
import json
import io
import os

sys.stdout = io.TextIOWrapper(
    sys.stdout.buffer,
    encoding="utf-8"
)
sys.path.append(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)
from services.markdown import extract_markdown
from services.assets import extract_assets

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(
            json.dumps({
                "success":False,
                "error":"PDF path required"
            })
        )
        sys.exit(1)
    pdf_path = sys.argv[1]
    try:
        markdown = extract_markdown(
            pdf_path
        )
        assets = extract_assets(
            pdf_path
        )
        print(
            json.dumps(
                {
                    "success":True,
                    "markdown":markdown,
                    "assets":assets
                },
                ensure_ascii=False
            )
        )
    except Exception as error:
        print(
            json.dumps({
                "success":False,
                "error":str(error)
            }),
            file=sys.stderr
        )
        sys.exit(1)