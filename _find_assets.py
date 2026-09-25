text = open(r"node_modules/wrangler/wrangler-dist/cli.js", encoding="utf-8", errors="ignore").read()
i = 0
shown = 0
while shown < 8:
    i = text.find("runCustomBuild", i)
    if i < 0:
        break
    print("---", i)
    print(text[i:i+280].replace("\n", " "))
    print()
    i += 14
    shown += 1
