---
title: 'CodeIO: code generation scripts + AI is better than plain AI'
description: 'How CodeIO makes PR review easier.'
pubDate: 2026-09-19
draft: false
tags: ['csharp', 'code-generation', 'developer-tools']
---

I built [CodeIO](https://github.com/nloum/CodeIO), a C# library that makes it really easy to parse your codebase and extract the types, properties, methods, etc.; and makes it easy to generate additional source code based on what it parsed.

I like using it because my AI-generated code reviews can be huge, but if I am using CodeIO I just have to review the core domain logic, the code generation script, and a few example outputs. I don't have to review all the generated code because it's coming from an easy-to-read code deterministic generation script rather than an AI. In other words, I would rather review this code:

```csharp
var codeWriter = new CodeWriter();

foreach(var clazz in DomainClasses)
{
	if (clazz.Attributes.Any(attr => attr.Type.Name == "HideFromApi")) continue;

	codeWriter.WriteLine("public class {clazz.Name}Dto {")

    foreach(var property in clazz.Properties)
    {
        if (!property.Attributes.Any(attr => attr.Type.Name == "HideFromApi")) continue;
        if (!property.IsPublic) continue;
        
        codeWriter.WriteLine($"public {property.Type} {property.Name} {{ get; set;}}")
    }
    
    codeWriter.WriteLine("}")
}
```

I'd rather review that than review 37 DTO classes that are AI-generated and may or may not contain errors. Whereas the script above codifies the rules for DTOs.

---

A side note: some web frameworks, such as Django, do a lot of magic behind the scenes so the code you manage can be only a few lines. I don't think that approach is ideal. I would rather be able to step through simple code than have see the debugger jump from one magical middleware to another. But I also don't want to painfully type out all the code; nobody does, that's why Django and similar web frameworks do so much magic behind the scenes.

AI coding changes the tradeoff around magic behind the scenes. Writing code is so cheap, but debugging it isn't a lot easier even in the AI age, so I think web frameworks with lots of "magic" in them are actually disadvantaged compared to frameworks that are more straightforward to debug.
