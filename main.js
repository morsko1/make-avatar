const CELL_SIZE = 70;
const IMAGE_SIZE = 420;

function getNum() {
    return Math.random() > 0.4 ? 1 : 0;
}

function generateGrid() {
    let pairs = [];
    let middle = [];
    for (let i = 0; i < 5; i++) {
        pairs.push([getNum(), getNum()]);
        middle.push(getNum());
    }
    let grid = [];
    for (let i = 0; i < 5; i++) {
        let row = [];
        let pair = pairs.shift();
        row.push(...pair);
        row.push(middle[i]);
        row.push(...pair.reverse());
        grid.push(row);
    }
    return grid;
}

function getRandomNum() {
    return Math.floor(Math.random() * 255);
}

function getRandomColor() {
    return `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`;
}

function generateAvatar() {
    const grid = generateGrid();
    const color = getRandomColor();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    if (canvas.getContext) {
        // clear canvas
        ctx.clearRect(0, 0, IMAGE_SIZE, IMAGE_SIZE);
        // fill canvas with white color
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, IMAGE_SIZE, IMAGE_SIZE);

        // generate avatar by grid
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j]) {
                    ctx.fillStyle = color;
                    ctx.fillRect(
                        j * CELL_SIZE + CELL_SIZE / 2,
                        i * CELL_SIZE + CELL_SIZE / 2,
                        CELL_SIZE,
                        CELL_SIZE
                    );
                }
            }
        }

        // add link for image downloading
        const link = document.createElement('a');
        link.classList.add('download__btn');
        link.innerHTML = 'Download Image';
        link.addEventListener('click', function() {
            link.href = canvas.toDataURL();
            link.download = 'img.png';
        }, false);
        const linkContainer = document.getElementById('download__container');
        linkContainer.innerHTML = '';
        linkContainer.appendChild(link);
    }
}
