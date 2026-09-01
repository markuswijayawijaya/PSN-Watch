import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
required = {
    "data/projects.csv": ["project_id", "name", "source_id"],
    "data/companies.csv": ["company_id", "name"],
    "data/people.csv": ["person_id", "name"],
    "data/relationships.csv": ["relationship_id", "source_id", "relationship_type"],
    "data/regulations.csv": ["regulation_id", "title", "source_id"],
    "data/sources.csv": ["source_id", "title", "url"],
    "data/evidence.csv": ["evidence_id", "source_id", "claim"],
}

for file, cols in required.items():
    p = ROOT / file
    with p.open(encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        missing = [c for c in cols if c not in reader.fieldnames]
        if missing:
            raise SystemExit(f"{file}: missing columns {missing}")

print("Schema validation OK.")
