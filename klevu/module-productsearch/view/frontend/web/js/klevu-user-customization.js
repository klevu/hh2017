var klevu_uc = {
    // landing page
    showLandingPageData : function ( product ){
        var toReturn = '',
            toAppendwithSalePrice = '',
            priceWithCurrency = '',
            appendCurrencyAtLast = false,
            salepriceClass = 'kuSalePrice',
            priceFormatter, priceToSet,
            showToLabel = false,
            additionalParams = '',
            keywords = document.getElementById( 'searchedKeyword' ).value,
            trackingParams = "";

        product = klevu_productCustomizations( product );
        if( product.productImage.trim().length === 0 ){
            product.productImage = klevu_userOptions.noImageUrl;
        }

        if( klevu_userOptions.openProductClicksInNewWindow ){
            additionalParams = ' target="_blank"';
        } else{
            additionalParams = ' onclick="klevu_analytics.stopClickDefault( event );"';
        }
        trackingParams = '{' +
                         'data: {' +
                         'code: \'' + escape(product.productCode) + '\',' +
                         'url: \'' + escape(product.productUrl) + '\',' +
                         'name: \'' + escape(product.productName) + '\',' +
                         'salePrice: \'' + escape(product.salePrice) + '\',' +
                         'rating: \''+ escape(product.rating) + '\',' +
                         'position: ' + product.productPosition +
                         '},' +
                         'apiKey: null,' +
                         'keywordsLP: \'' + escape(keywords) + '\'' +
                         '}';
        // code for the result block
        toReturn += '<li>';
        toReturn += '<div class="klevuImgWrap"><a href="' + product.productUrl +
                    '" target="_blank" ';
        if( klevu_commons.isMobileDevice() ){
            toReturn += ' onclick="return klevu_analytics.trackClickedProduct(event, ' + trackingParams + ');" >';
        } else{
            toReturn += ' onmousedown="return klevu_analytics.trackClickedProduct(event, ' + trackingParams + ');" ' + additionalParams + '>';
        }
        toReturn += '<img src="' +
                    product.productImage + '" onerror="this.onerror=null;this.src=\'' +
                    klevu_userOptions.noImageUrl + '\';" /></a></div>';
        if( 'undefined' !== typeof klevu_showDiscountBadge &&
            klevu_showDiscountBadge && product.discount != '0' ){
            toReturn += '<div class="kuDiscountBadge">' +
                        klevu_uiLabels.discountBadgeText + ' ' +
                        Number( product.discount ).toFixed(0) +
                        '%</div>';
        }
        toReturn += '<div class="kuNameDesc">';
        toReturn +=	'<div class="kuName"><a href="' + product.productUrl +
                       '" target="_blank" ';
        if( klevu_commons.isMobileDevice() ){
            toReturn +=	' onclick="return klevu_analytics.trackClickedProduct(event, ' + trackingParams + ');" >';
        } else{
            toReturn +=	' onmousedown="return klevu_analytics.trackClickedProduct(event, ' + trackingParams + ');" ' + additionalParams + '>';
        }
        toReturn +=	product.productName + '</a></div>';

        if( product.rating.trim().length > 0 && !isNaN(Number(product.rating)) &&
            Number(product.rating) <= 5 && Number(product.rating) >= 0 ){
            var starWidth = 20 * Number(product.rating);
            toReturn += '<div class="kuStarsSmall">'+
                        '<div class="kuRating" style="width:' + starWidth +
                        '%;"></div></div>';
        }
        toReturn += '</div>';

        toReturn += '<div class="kuPrice">';
        if( klevu_showPrices ){
            toReturn += klevu_commons.showProductPrices( 'LANDING', product,
                                                         salepriceClass, 'kuSalePrice kuSpecialPrice' );
        }

        if( klevu_userOptions.vatCaption.trim().length > 0 ){
            toReturn += '<div class="klevu-vat-caption">(' + klevu_userOptions.vatCaption + ')</div>';
        }

        if( product.totalProductVariants && product.totalProductVariants != '0' ){
            toReturn += '<div class="klevu-variants">+' + product.totalProductVariants +
                        ' ' + klevu_uiLabels.variants + '</div>';
        }
        if( klevu_userOptions.outOfStockCaption.trim().length > 0 ){
            if( ( product.inStock ) && product.inStock === 'no' ){
                toReturn += '<div class="klevu-out-of-stock">' +
                            klevu_userOptions.outOfStockCaption + '</div>';
            }
        }

        toReturn += '</div>';
        toReturn += '<div class="kuDesc">' + product.productDescription + '</div>';
        if( klevu_commons.showAddToCartButton( product.inStock, product.hideAddToCart ) ){
            if( product.totalProductVariants && product.totalProductVariants == '0' ){
                toReturn += '<div class="kuAddtocart">' +
                            '<input type="text" name="klevu-qty" id="klevu-qty-' +
                            escape( product.productCode ) + '" placeholder="' +
                            klevu_uiLabels.addToCartPlaceholder + '"/>' +
                            '<a href="javascript:klevu_lpSendProductToCart(\'' +
                            escape( product.productCode ) + '\', \'' +
                            escape( product.productUrl ) + '\', \'klevu-qty-' +
                            escape( product.productCode ) + '\');" ' +
                            'class="kuAddtocartBtn">' + klevu_userOptions.addToCartButton + '</a>' +
                            '</div>';
            } else{
                toReturn += '<div class="kuAddtocart">' +
                            '<a href="' + product.productUrl +
                            '" class="kuAddtocartBtn">' + klevu_userOptions.addToCartButton + '</a>' +
                            '</div>';
            }
            toReturn += '<div class="klevu-clearboth-listview"></div>';
        }
        toReturn += '<div class="kuClearLeft"></div>';
        toReturn +=	'</li>';

        return toReturn;
    },
    showTotalResultsText: function( pagination, totalResultsFound, totalcmsContent ){
        var kuTotResults = document.getElementById('totalItems'),
            start = 0, end = 0,
            textToShow = "<strong>" + totalResultsFound + " ITEM(S)</strong>",
            classToApply = "amount amount--no-pages";
        if( Number( pagination.totalLandingResultsFound ) > Number( pagination.landingRecordsPerPage ) ){
            start = Number( pagination.landingStartPosition ) + 1;
            end = Number( pagination.landingStartPosition ) + Number( pagination.landingRecordsPerPage );
            textToShow = "<span>SHOWING</span> " + start + " - " + end + " of " + totalResultsFound +" ITEMS ";
            classToApply = "amount amount--has-pages";
        } else{
            textToShow = "<strong>" + totalResultsFound + " ITEM(S)</strong>";
            classToApply = "amount amount--no-pages";
        }
        kuTotResults.innerHTML = textToShow;
        kuTotResults.className = classToApply;
    }
}