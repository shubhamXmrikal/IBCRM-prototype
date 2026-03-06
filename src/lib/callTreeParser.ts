import { CallCategoryNode } from "../domain/call/CallHandlingTypes";

export function parseCallCategoryXml(xmlContent: string): CallCategoryNode[] {
  const nodes: CallCategoryNode[] = [];
  const categoryRegex = /<callcategory>\s*<key>([\s\S]*?)<\/key>\s*<value>([\s\S]*?)<\/value>\s*<\/callcategory>/g;
  let match;

  const tree: Record<string, any> = {};

  while ((match = categoryRegex.exec(xmlContent)) !== null) {
    const key = match[1];
    const value = match[2];
    const parts = key.split("_");

    let current = tree;
    let path = "";

    parts.forEach((part, index) => {
      path = path ? `${path}_${part}` : part;
      if (!current[part]) {
        current[part] = {
          id: path,
          label: part.replace(/([A-Z])/g, " $1").trim(), // Simple camelCase to Space separation
          children: {},
          isLeaf: index === parts.length - 1,
          legacyValue: index === parts.length - 1 ? value : undefined,
        };
      }
      current = current[part].children;
    });
  }

  // Flatten the tree into a list of nodes for easier consumption if needed, 
  // or just return the root level.
  // For the prototype, we'll return a flat list with parentId references.
  
  function flatten(obj: Record<string, any>, parentId?: string) {
    Object.values(obj).forEach(node => {
      nodes.push({
        id: node.id,
        label: node.label,
        parentId: parentId,
        isLeaf: node.isLeaf,
        legacyValue: node.legacyValue,
        isCallDropCategory: node.label.toLowerCase().includes("drop") || node.label.toLowerCase().includes("insufficient")
      });
      flatten(node.children, node.id);
    });
  }

  flatten(tree);
  return nodes;
}
