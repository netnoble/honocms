import {Context} from "hono";

//面向文章、产品
export const optionItemTreeComponent = (c: Context, categoryList: any, id: number) => {

    return categoryList.map((item: any) => {
        let isSelected = item.id == id ? ' selected' : '';
        let options = `<option value="${item.id}" ${isSelected}>${item.name}</option>`;
        if (item.children && item.children.length > 0) {
            item.children.forEach((child: any) => {
                isSelected = child.id == id ? ' selected' : '';
                options += `<option value="${child.id}" ${isSelected}> |-- ${child.name}</option>`;
            });
        }
        return options;
    }).join('');
}

export const optionCategoryTreeComponent = (c: Context, categoryList: any, id: number) => {

    return categoryList.map((item: any) => {
        let isSelected = item.id == id ? ' selected' : '';
        return `<option value="${item.id}" ${isSelected}>${item.name}</option>`;
    }).join('');
}

