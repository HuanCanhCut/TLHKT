// Leaderboard Datasets (Weekly vs Monthly)
const leaderboardData = {
    weekly: {
        podium: [
            { rank: 1, name: 'Marcus J.', xp: '15,200', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLsdlwqkaP8xSBL2j5R_XgjYj0NSJEcyVphJc71V89ZUKxijVSrjNB8Q8m3JM--HBZPkh2Lojtb1f0jnilM6t1bXJ9eQi1pi3ze1etRXqfIVbzKFZAWOHP2AKCyOmZwW33CKEOyqJx5YCK9UR2od6YNB_fMEwO6DTWu0QKIGZe1yiikk5YBWRYfeYHBjeB6bF3CBIEAbZ9jGqXt3xsyqIudILmankwK8ixWIIRxlsYrJJVgPPscaR-eEk2s' },
            { rank: 2, name: 'Elena R.', xp: '12,450', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLuNe723HjwlugBsXZ830w-ByCwKwzcmM8pu28BsIRXopdp63lMbhJ3UdM8BpyU5A260Ly-uVCtb7kYuZoTmONB5FxIMOnI9pUAi7oarGrB0GbBeGK_j56BQi7Td7ILYx7JkaykymMHX375GrPE1TiqU9RsCc9eOleoAlDG-HvPuiFxH-fK5zcqYQZTvPITMaZQOJh40WgZJCG13ZX_wgjvLROzUasZqyU23DEUNSUKEDP8UiofndRrpzQ' },
            { rank: 3, name: 'Sophia K.', xp: '11,980', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLuWUrwY0pwUxfx0oh3zSALavGor5Icwpr6O0e7EDpZqNNrkNK3Ec2LmYJMT5nCi2LPJdf3gVp4MzaywDrThtB8wLcjALN37MfxzpF_0_nUZCk8MmWVyy4IhM_YwSheQHJwNJ5bidxfN7TesFfbx2Ce2vgBSQrYfAL2Ury1sooU1JYwi9N-6cVOy1-Pxu78_NxwlJlOb3PNdZbprg9gchUAJHxFU_AJjnwMFKISiCzWfoam4-RK8QDuY8h0' }
        ],
        list: [
            { rank: 4, name: 'Liam Chen', xp: '10,420', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLuiqUGepRYEhzTJa-af5epOc2EVmzqfPzKiSWMq2N3aAAMyfgGbgSSM2yiqCRmzRwYlA9pZW8GY8cdj1baGqL4PU5k76CyjjLcoirodQT3Ll1cKQZWFVh-gYRd0VlagSwHfKFyyazPzMuOi8U3hPPsZiYEUd1eiCC5GPaKxEdawcJ7fA6blFidBY7c1KhJ3RAsWVYwRT4HD6vAWChZDONZ2FVk4W4EEh5LX1LhjguNoIDEVMf5YdC0J7kg', badge: 'Polyglot', badgeClass: 'bg-secondary-container text-on-secondary-container', isUser: false },
            { rank: 5, name: 'You (Alex Smith)', xp: '9,850', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLusAUoYwCcV1t8zHjzw53aklgGLwv9JzjjLGIkUveR2XVsYhRnavUt7pFjwRtW9XMvpvLvOSge4vhZw0F112UakAsrOTwFx75JIk1jw9bb9q0mjhjMeld0F_v8T8Jj73e_-h-TKbmAVeGUPUiMwF-GWNXrItN_IVyodn6nUbfmzzSJEN62yRuZ3UPPfS7vjP7IMTq7ZUiU-i1G_BHgyF-xpXdpHHX47vNex9JIs_7hgEvWhAn2LDvB2zw', badge: 'Rising Star', badgeClass: 'bg-tertiary-container text-on-tertiary-container', isUser: true },
            { rank: 6, name: 'Aria V.', xp: '9,200', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLuQLRYa7Ilo6UhJUTVGJcaiDdskpCjqgCPJhaIvauaNMxGyxjmcxbWY1v0dsbTleoK46lvVr6TD7ITVTVC0NgwHLjkn6N0znISP7WS96OcmeCG-86q5-0nrYdX1LlZDj9nfi0hD5DUo6ZqBCOtCpLWZEyw6d0bFfmsWIWkCAEJrdtW4p1XbOguMappC0Jv8BSdXS-gEI4M9RZi4nVmNoh98M7oV5j6HqVbUK2LBdvvRi6_01OrlXc3m9Sk', badge: 'Top 10%', badgeClass: 'bg-surface-container-highest text-on-surface-variant', isUser: false },
            { rank: 7, name: 'David Miller', xp: '8,750', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLt1RnnNLI1D6L7oTSC27XCS9MuGEintk52W2MxNKYLz4H3ctchN0so7Xo7Du3iKxJeB6yw9gQDUxVkwyMj8mdsUlmbWX12cWtumpGeVa5BkSGyWJS2Gtxkk7C3RNUi52PIoSsk-pRsrwZwHTpm-WQEd1YkOAdyT35XngItsYEKUD_vBEhbuJO5QEc-YQMToybUj8RvzUZjyVfmZcwFyrj2ioNt1A3DCjWdmbD_RXSocZ7GpmcSjzt4jGg', badge: null, isUser: false },
            { rank: 8, name: 'Yuna Park', xp: '8,100', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLu0YhEUFziMSDBK6PixkIoMfArJBiS7MSKNXlrh9YqvyswVHX-gGljoGs0HKJXxif8x22KTmS29_OwuHwuC4U3UnQGPkx37rTSDcEdSiYZCx0iheRWNcG4JhHZrFzw0jcVU5JXKJy43rf4dBAeeBVTbBRQRoYb7FcU17dWYvdvn858d4w1-YRCdlKl5CKFc50BRGSldrrEgJr_Y8zNAoLDjU50vlcmWjQL75OWaxq3d7NgJhtLp3Yf3rvw', badge: null, isUser: false },
            { rank: 9, name: 'Jordan S.', xp: '7,600', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLuj8aYQkcGxqwIMusHN3WQvLDLZ5ImSYqM287gmie8KbxBb1VqYqSVYuFqbSG5etE4yRN68__mHKx2oj0pw7lC5UkGeWrtaq4N7w-igpQb_3Bi16w0WfQH31sw953MfDlNzctnnKv0GuGY1ylo65hngiRV9FURhZDe4xZjTD6anGbnCBugvn4K61DB1R03Fdn6j2AACktU5JOnXnOuxd4K5RDOJuPE10W5AuT1fJ_fDtawxn3ycb68kjdc', badge: null, isUser: false },
            { rank: 10, name: 'Isabella Q.', xp: '7,420', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLvRhgOBJKwQugIFPn6_Afm0dLNQgDqVnGrrGyY9aTvVE35T-SdMsIrj-QR586TD8pwiVUmoN-D9a4tQSJH20BEAQuvSTBqDnEMRH0v52d3DFrF-37EB5L223j8N3OZipZAme5jbGTXoDI0jwRkMw8M8AxatnEleG53CtEERxBY_-41A1H83tCZNmgcQuNzDcKJF4Pa3CaWvDhyf3-febkt7wLpjyM0eA-5LjUpPBw1sIxaSOdLd2_De9UA', badge: null, isUser: false }
        ],
        personal: { rank: '#5', next: '#4', remaining: '570', percent: '65%' }
    },
    monthly: {
        podium: [
            { rank: 1, name: 'Elena R.', xp: '45,200', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLuNe723HjwlugBsXZ830w-ByCwKwzcmM8pu28BsIRXopdp63lMbhJ3UdM8BpyU5A260Ly-uVCtb7kYuZoTmONB5FxIMOnI9pUAi7oarGrB0GbBeGK_j56BQi7Td7ILYx7JkaykymMHX375GrPE1TiqU9RsCc9eOleoAlDG-HvPuiFxH-fK5zcqYQZTvPITMaZQOJh40WgZJCG13ZX_wgjvLROzUasZqyU23DEUNSUKEDP8UiofndRrpzQ' },
            { rank: 2, name: 'Marcus J.', xp: '44,100', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLsdlwqkaP8xSBL2j5R_XgjYj0NSJEcyVphJc71V89ZUKxijVSrjNB8Q8m3JM--HBZPkh2Lojtb1f0jnilM6t1bXJ9eQi1pi3ze1etRXqfIVbzKFZAWOHP2AKCyOmZwW33CKEOyqJx5YCK9UR2od6YNB_fMEwO6DTWu0QKIGZe1yiikk5YBWRYfeYHBjeB6bF3CBIEAbZ9jGqXt3xsyqIudILmankwK8ixWIIRxlsYrJJVgPPscaR-eEk2s' },
            { rank: 3, name: 'Yuna Park', xp: '39,800', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLu0YhEUFziMSDBK6PixkIoMfArJBiS7MSKNXlrh9YqvyswVHX-gGljoGs0HKJXxif8x22KTmS29_OwuHwuC4U3UnQGPkx37rTSDcEdSiYZCx0iheRWNcG4JhHZrFzw0jcVU5JXKJy43rf4dBAeeBVTbBRQRoYb7FcU17dWYvdvn858d4w1-YRCdlKl5CKFc50BRGSldrrEgJr_Y8zNAoLDjU50vlcmWjQL75OWaxq3d7NgJhtLp3Yf3rvw' }
        ],
        list: [
            { rank: 4, name: 'Aria V.', xp: '38,200', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLuQLRYa7Ilo6UhJUTVGJcaiDdskpCjqgCPJhaIvauaNMxGyxjmcxbWY1v0dsbTleoK46lvVr6TD7ITVTVC0NgwHLjkn6N0znISP7WS96OcmeCG-86q5-0nrYdX1LlZDj9nfi0hD5DUo6ZqBCOtCpLWZEyw6d0bFfmsWIWkCAEJrdtW4p1XbOguMappC0Jv8BSdXS-gEI4M9RZi4nVmNoh98M7oV5j6HqVbUK2LBdvvRi6_01OrlXc3m9Sk', badge: 'Top 10%', badgeClass: 'bg-surface-container-highest text-on-surface-variant', isUser: false },
            { rank: 5, name: 'Liam Chen', xp: '37,900', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLuiqUGepRYEhzTJa-af5epOc2EVmzqfPzKiSWMq2N3aAAMyfgGbgSSM2yiqCRmzRwYlA9pZW8GY8cdj1baGqL4PU5k76CyjjLcoirodQT3Ll1cKQZWFVh-gYRd0VlagSwHfKFyyazPzMuOi8U3hPPsZiYEUd1eiCC5GPaKxEdawcJ7fA6blFidBY7c1KhJ3RAsWVYwRT4HD6vAWChZDONZ2FVk4W4EEh5LX1LhjguNoIDEVMf5YdC0J7kg', badge: 'Polyglot', badgeClass: 'bg-secondary-container text-on-secondary-container', isUser: false },
            { rank: 6, name: 'David Miller', xp: '35,400', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLt1RnnNLI1D6L7oTSC27XCS9MuGEintk52W2MxNKYLz4H3ctchN0so7Xo7Du3iKxJeB6yw9gQDUxVkwyMj8mdsUlmbWX12cWtumpGeVa5BkSGyWJS2Gtxkk7C3RNUi52PIoSsk-pRsrwZwHTpm-WQEd1YkOAdyT35XngItsYEKUD_vBEhbuJO5QEc-YQMToybUj8RvzUZjyVfmZcwFyrj2ioNt1A3DCjWdmbD_RXSocZ7GpmcSjzt4jGg', badge: null, isUser: false },
            { rank: 7, name: 'You (Alex Smith)', xp: '34,800', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLusAUoYwCcV1t8zHjzw53aklgGLwv9JzjjLGIkUveR2XVsYhRnavUt7pFjwRtW9XMvpvLvOSge4vhZw0F112UakAsrOTwFx75JIk1jw9bb9q0mjhjMeld0F_v8T8Jj73e_-h-TKbmAVeGUPUiMwF-GWNXrItN_IVyodn6nUbfmzzSJEN62yRuZ3UPPfS7vjP7IMTq7ZUiU-i1G_BHgyF-xpXdpHHX47vNex9JIs_7hgEvWhAn2LDvB2zw', badge: 'Rising Star', badgeClass: 'bg-tertiary-container text-on-tertiary-container', isUser: true },
            { rank: 8, name: 'Sophia K.', xp: '33,100', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLuWUrwY0pwUxfx0oh3zSALavGor5Icwpr6O0e7EDpZqNNrkNK3Ec2LmYJMT5nCi2LPJdf3gVp4MzaywDrThtB8wLcjALN37MfxzpF_0_nUZCk8MmWVyy4IhM_YwSheQHJwNJ5bidxfN7TesFfbx2Ce2vgBSQrYfAL2Ury1sooU1JYwi9N-6cVOy1-Pxu78_NxwlJlOb3PNdZbprg9gchUAJHxFU_AJjnwMFKISiCzWfoam4-RK8QDuY8h0', badge: null, isUser: false },
            { rank: 9, name: 'Jordan S.', xp: '32,000', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLuj8aYQkcGxqwIMusHN3WQvLDLZ5ImSYqM287gmie8KbxBb1VqYqSVYuFqbSG5etE4yRN68__mHKx2oj0pw7lC5UkGeWrtaq4N7w-igpQb_3Bi16w0WfQH31sw953MfDlNzctnnKv0GuGY1ylo65hngiRV9FURhZDe4xZjTD6anGbnCBugvn4K61DB1R03Fdn6j2AACktU5JOnXnOuxd4K5RDOJuPE10W5AuT1fJ_fDtawxn3ycb68kjdc', badge: null, isUser: false },
            { rank: 10, name: 'Isabella Q.', xp: '31,500', avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLvRhgOBJKwQugIFPn6_Afm0dLNQgDqVnGrrGyY9aTvVE35T-SdMsIrj-QR586TD8pwiVUmoN-D9a4tQSJH20BEAQuvSTBqDnEMRH0v52d3DFrF-37EB5L223j8N3OZipZAme5jbGTXoDI0jwRkMw8M8AxatnEleG53CtEERxBY_-41A1H83tCZNmgcQuNzDcKJF4Pa3CaWvDhyf3-febkt7wLpjyM0eA-5LjUpPBw1sIxaSOdLd2_De9UA', badge: null, isUser: false }
        ],
        personal: { rank: '#7', next: '#6', remaining: '600', percent: '50%' }
    }
};

function renderLeaderboard(timeframe) {
    const data = leaderboardData[timeframe];
    if (!data) return;

    // 1. Render Podium (Top 3)
    data.podium.forEach(player => {
        const podiumEl = document.getElementById(`podium-rank-${player.rank}`);
        if (podiumEl) {
            const img = podiumEl.querySelector('img');
            const nameText = podiumEl.querySelector('.font-headline-md');
            const xpText = podiumEl.querySelector('.text-secondary') || podiumEl.querySelector('.text-on-tertiary-fixed');
            
            if (img) img.src = player.avatar;
            if (nameText) nameText.innerText = player.name;
            if (xpText) {
                // If it is Rank 1, it has the stars icon inside, so we update the text child Node
                if (player.rank === 1) {
                    const xpValText = podiumEl.querySelector('p.text-on-tertiary-fixed') || xpText;
                    if (xpValText) xpValText.innerText = `${player.xp} XP`;
                } else {
                    xpText.innerText = `${player.xp} XP`;
                }
            }
        }
    });

    // 2. Render List (Ranks 4-10)
    const listContainer = document.getElementById('leaderboard-list');
    if (listContainer) {
        listContainer.innerHTML = ''; // Clear current rows
        
        data.list.forEach(player => {
            const row = document.createElement('div');
            
            if (player.isUser) {
                row.className = 'flex items-center justify-between p-md bg-primary-container/10 border-l-4 border-primary group';
            } else {
                row.className = 'flex items-center justify-between p-md hover:bg-surface-container transition-colors group';
            }

            const badgeHtml = player.badge 
                ? `<span class="px-xs py-[2px] ${player.badgeClass} rounded text-[10px] font-bold uppercase">${player.badge}</span>` 
                : '';

            row.innerHTML = `
                <div class="flex items-center space-x-md">
                    <span class="w-6 ${player.isUser ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'} text-body-md">${player.rank}</span>
                    <div class="relative">
                        <div class="w-10 h-10 rounded-full overflow-hidden border ${player.isUser ? 'border-2 border-primary' : 'border-outline-variant'}">
                            <img alt="${player.name}" src="${player.avatar}" />
                        </div>
                        ${player.isUser ? '<span class="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-surface"></span>' : ''}
                    </div>
                    <div>
                        <p class="${player.isUser ? 'font-extrabold text-primary' : 'font-bold text-on-surface'}">${player.name}</p>
                        ${badgeHtml ? `<div class="flex space-x-xs mt-1">${badgeHtml}</div>` : ''}
                    </div>
                </div>
                <div class="text-right">
                    <p class="${player.isUser ? 'font-extrabold text-primary' : 'font-bold text-primary'}">${player.xp}</p>
                    <p class="text-label-sm font-label-sm ${player.isUser ? 'text-primary/70' : 'text-outline'}">XP</p>
                </div>
            `;
            
            // Add mouseenter/mouseleave transform micro-interactions
            row.addEventListener('mouseenter', () => {
                if (!player.isUser) {
                    row.style.transform = 'translateX(4px)';
                    row.style.transition = 'transform 0.2s ease-out';
                }
            });
            row.addEventListener('mouseleave', () => {
                row.style.transform = 'translateX(0)';
            });

            listContainer.appendChild(row);
        });
    }

    // 3. Render Personal Standing Card
    const globalRankText = document.getElementById('user-global-rank');
    const nextRankLabel = document.getElementById('user-next-rank-label');
    const remainingXpText = document.getElementById('user-remaining-xp');
    const progressFill = document.getElementById('user-rank-progress-fill');

    if (globalRankText) globalRankText.innerText = data.personal.rank;
    if (nextRankLabel) nextRankLabel.innerText = `XP to Next Rank (${data.personal.next})`;
    if (remainingXpText) remainingXpText.innerText = `${data.personal.remaining} XP remaining`;
    if (progressFill) progressFill.style.width = data.personal.percent;
}

// Simple Interaction Logic for Tab Toggle
const weeklyBtn = document.getElementById('toggle-weekly');
const monthlyBtn = document.getElementById('toggle-monthly');

if (weeklyBtn && monthlyBtn) {
    function setActive(active, inactive) {
        active.classList.add('bg-primary-container', 'text-on-primary-container', 'shadow-sm');
        active.classList.remove('text-on-surface-variant', 'hover:bg-surface-container-highest');
        
        inactive.classList.remove('bg-primary-container', 'text-on-primary-container', 'shadow-sm');
        inactive.classList.add('text-on-surface-variant', 'hover:bg-surface-container-highest');
    }

    weeklyBtn.addEventListener('click', () => {
        setActive(weeklyBtn, monthlyBtn);
        renderLeaderboard('weekly');
    });
    
    monthlyBtn.addEventListener('click', () => {
        setActive(monthlyBtn, weeklyBtn);
        renderLeaderboard('monthly');
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard('weekly');
});
