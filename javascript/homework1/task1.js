"use strict";

// Задание 1.

const hasEqualItem = (arr, item) => arr.some((currentItem) => currentItem === item);

const getRecommendGroup = (currentList, arr) => {
    const recommendGroup = [...currentList];    

    currentList.forEach((letter) => {
        arr.forEach((list) => {
            if (hasEqualItem(list, letter)) {
                const additionalItems = list.filter((item) => (
                    !hasEqualItem(recommendGroup, item)
                ));

                if (additionalItems.length) {
                    recommendGroup.push(...additionalItems);

                    getRecommendGroup(recommendGroup, arr);
                }
            }
        })
    });

    return recommendGroup;
};

const getRecommendGroups = (arr) => {
    const recommendGroups = [];

    for (let i = 0; i < arr.length; i++) {
        const recommendGroup = getRecommendGroup(arr[i], arr);
        recommendGroups.push(recommendGroup); 
    }

    return recommendGroups;
};

const getMaxItem = (arr) => {
    const sortedItems = arr.sort((a, b) => 
        a.toLocaleString().localeCompare(b.toLocaleString())
    );
    const firstItemIndex = 0;
    return sortedItems[firstItemIndex];
};

const maxItemAssociation = (usersBuyingList) => {
    const recommendGroups = getRecommendGroups(usersBuyingList);
    const maxItem = getMaxItem(recommendGroups);

    return [...maxItem].sort();
};
