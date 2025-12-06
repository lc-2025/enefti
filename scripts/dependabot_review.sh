gh pr comment "$1" -b "@$2 This is a **major version bump** — please review before merging."
gh pr review "$1" --request "$2"
