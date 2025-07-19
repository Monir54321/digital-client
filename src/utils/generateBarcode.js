// utils/barcodeUtils.js
import $ from 'jquery';
import PDF417 from 'pdf417';

function generateBarcode(hub3Code, canvasId) {
    var bw = 2,
        bh = 2,
        y = 0;

    PDF417.init(hub3Code);
    var barcode = PDF417.getBarcodeArray();
    var canvas = document.getElementById(canvasId);
    canvas.width = bw * barcode['num_cols'];
    canvas.height = bh * barcode['num_rows'];
    var ctx = canvas.getContext('2d');
    
    for (var r = 0; r < barcode['num_rows']; ++r) {
        var x = 0;
        for (var c = 0; c < barcode['num_cols']; ++c) {
            if (barcode['bcode'][r][c] === 1) {
                ctx.fillRect(x, y, bw, bh);
            }
            x += bw;
        }
        y += bh;
    }
}

function setCustomSize(nameBnId, nameEnId) {
    var nameBnHeight = parseInt($(`#${nameBnId}`).height());
    var nameEnHeight = parseInt($(`#${nameEnId}`).height());
    var nameBnFontSize = parseInt($(`#${nameBnId}`).css('font-size'));
    var nameEnFontSize = parseInt($(`#${nameEnId}`).css('font-size'));
    
    if (nameBnHeight < 20 && nameEnHeight < 20) {
        return;
    } else {
        var newBnFontSize = nameBnFontSize - 1;
        var newEnFontSize = nameEnFontSize - 1;
        if (nameBnHeight > 19) {
            $(`#${nameBnId}`).css('font-size', newBnFontSize);
        }
        if (nameEnHeight > 19) {
            $(`#${nameEnId}`).css('font-size', newEnFontSize);
        }
        setCustomSize(nameBnId, nameEnId);
    }
}


// Generate PDF417 barcode as Data URL (for React usage)
// Usage: generateBarcodeDataUrl(data) => Promise<string>
function generateBarcodeDataUrl(data) {
    return new Promise((resolve, reject) => {
        try {
            PDF417.init(data);
            const barcode = PDF417.getBarcodeArray();
            const bw = 2, bh = 2;
            const canvas = document.createElement('canvas');
            canvas.width = bw * barcode['num_cols'];
            canvas.height = bh * barcode['num_rows'];
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#000';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let y = 0;
            for (let r = 0; r < barcode['num_rows']; ++r) {
                let x = 0;
                for (let c = 0; c < barcode['num_cols']; ++c) {
                    if (barcode['bcode'][r][c] === 1) {
                        ctx.fillRect(x, y, bw, bh);
                    }
                    x += bw;
                }
                y += bh;
            }
            resolve(canvas.toDataURL('image/png'));
        } catch (e) {
            reject(e);
        }
    });
}

export { generateBarcode, setCustomSize, generateBarcodeDataUrl };

