import re
import json

file_path = 
  '/home/ubuntu/oscar-prep-uk-landing/src/data/learning-content.ts'

with open(file_path, 'r') as f:
    content = f.read()

# Extract the content of the learningContent array
match = re.search(r'export const learningContent: LearningTopic\[\] = (\s*\[[\s\S]*?\]);', content)

if not match:
    print('Error: Could not find learningContent array in the file.')
    exit(1)

json_like_str = match.group(1)

# Replace TypeScript specific syntax with valid JSON syntax
# Replace single quotes with double quotes
json_like_str = json_like_str.replace("'", '"')
# Replace backticks with double quotes for content strings
# This is the crucial part for handling special characters. We need to escape them.
# First, escape existing double quotes inside backticks
json_like_str = re.sub(r'`([^`]*)"([^`]*)"`', r'`\1\\"\2`', json_like_str)
# Then, replace backticks with double quotes and escape newlines and other control characters
json_like_str = re.sub(r'`([\s\S]*?)`', lambda m: json.dumps(m.group(1)), json_like_str)

# Add double quotes around unquoted property names
json_like_str = re.sub(r'([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*):', r'\1"\2":', json_like_str)
# Remove trailing commas from objects and arrays
json_like_str = re.sub(r',\s*([}\]])', r'\1', json_like_str)

# Handle icon imports by temporarily replacing them with string placeholders
icon_placeholders = {
    'Stethoscope': '"Stethoscope_ICON"',
    'Heart': '"Heart_ICON"',
    'Pill': '"Pill_ICON"',
    'Shield': '"Shield_ICON"',
    'Activity': '"Activity_ICON"',
    'Zap': '"Zap_ICON"',
    'UserCheck': '"UserCheck_ICON"',
    'FileText': '"FileText_ICON"',
    'Scale': '"Scale_ICON"',
    'Globe': '"Globe_ICON"',
    'Brain': '"Brain_ICON"',
    'Users': '"Users_ICON"',
    'ClipboardList': '"ClipboardList_ICON"',
    'TrendingUp': '"TrendingUp_ICON"'
}
for icon_name, placeholder in icon_placeholders.items():
    json_like_str = json_like_str.replace(icon_name, placeholder)

try:
    data = json.loads(json_like_str)
except json.JSONDecodeError as e:
    print(f"JSON Decode Error: {e}")
    print(f"Problematic string part: {json_like_str[max(0, e.pos-50):e.pos+50]}")
    exit(1)

# Add a second session to each topic
for topic in data:
    if len(topic['sessions']) == 1: # Only add if there's only one session
        new_session_id = f"{topic['slug'].split('-')[0]}-2"
        new_session_title = f"Advanced {topic['title']} Concepts"
        new_session_description = f"Delving deeper into {topic['title']} for comprehensive understanding."
        new_session_section_id = f"{topic['slug'].split('-')[0]}-2-1"
        new_session_section_title = f"In-depth {topic['title']} Analysis"

        new_session = {
            "id": new_session_id,
            "title": new_session_title,
            "description": new_session_description,
            "sections": [
                {
                    "id": new_session_section_id,
                    "title": new_session_section_title,
                    "type": "content",
                    "content": "This is the content for the second session. It will be expanded with relevant information for each topic.",
                    "estimatedTime": 15
                }
            ]
        }
        topic['sessions'].append(new_session)
        topic['totalEstimatedTime'] += 15 # Add estimated time for the new session

# Convert back to JSON string and then to TypeScript format
updated_json_str = json.dumps(data, indent=2)

# Revert icon placeholders back to original TypeScript syntax
for icon_name, placeholder in icon_placeholders.items():
    updated_json_str = updated_json_str.replace(placeholder, icon_name)

# Revert content strings from double quotes to backticks
# This regex needs to be careful not to replace already escaped quotes
updated_json_str = re.sub(r'"This is the content for the second session\\. It will be expanded with relevant information for each topic\\."', r'`This is the content for the second session. It will be expanded with relevant information for each topic.`', updated_json_str)

final_content = content[:match.start(1)] + updated_json_str + content[match.end(1):]

with open(file_path, 'w') as f:
    f.write(final_content)

print('Successfully added second session to all topics and updated estimated times.')


