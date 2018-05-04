<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
</xsl:template>
    <?xml version="1.0" encoding="UTF-8"?>
    <manifest xmlns="http://aue.chn.hp.com/schema/eos/v1"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://aue.chn.hp.com/schema/eos/v1 http://eos.dev.hpeos.com/schema/manifest.xsd">
        <page id="TestDetail">
            <scripts>
                <script src="lua/controller/TestDetailController.lua" />
            </scripts>
            <metadata>
                <data key="statusBarStyle" schema="string">StatusBarStyleDefault</data>
                <data key="statusBarTransparent" schema="string">true</data>
            </metadata>
            <layout paddingTop="0" >
                <view backgroundColor="#efefef" marginTop="45" >
                    <view />
                    <scrollview id="productDetailView" marginTop="0" marginBottom="40" backgroundColor="#efefef">
                        <vbox>
                            <vbox id="productInfoVbox" marginTop="0" height="445" backgroundColor="#ffffff" >
                                <view id="productInfoView" margin="0 0 auto 0" height="120" >
                                    <label id="productNameLb" margin="5 auto auto 5" height="34" width="270" fontSize="15" color="#222222" align="left" wrap="true" backgroundColor="pink"/>
                                    <label id="productSkuLb" margin="60 auto auto 10" height="11" width="67" align="left" color="#777777" fontSize="10" text="" backgroundColor="pink" />

                                    <label id="productDesc" margin="60 0 auto 80" height="11" width="67" align="left" color="#333333" fontSize="10" text="" backgroundColor="pink"  />

                                </view>

                                <view id="scrollingBannerView" margin="0 5 auto 5" height="300" backgroundColor="#dddddd" >
                                    <image id="productImage" margin="0 0 auto 0" backgroundScale="fill" height="120"  />
                                    <view id="colorSelectView" margin="120 0 auto 0" height="123" hidden="false">
                                        <label id="titleName" margin="10 auto auto 15" height="25" width="55" fontSize="12" align="left" verticalAlign="top" color="#222222" text="颜色分类" backgroundColor="pink" />
                                    </view>
                                    <label id="productPriceLb" margin="250 auto auto 15" width="95" height="19" text="$290" align="left" color="#333333" fontSize="16" backgroundColor="pink" />
                                    <label id="productIsHas" margin="250 10 auto auto" width="95" height="19" text="out of stock" align="right" color="#333333" fontSize="16" backgroundColor="pink" />
                                </view>
                                <view id="controlDescView" margin="0 5 auto 5" height="40" backgroundColor="yellow" hidden="false"/>

                            </vbox>
                        </vbox>
                    </scrollview>
                    <view id="bottomMenuView" margin="auto 0 0 0" height="25" backgroundColor="#ffffff" >
                        <view id="quantitySelectView" margin="0 115 0 auto" width="100" />

                        <view id="addToShoppingCart" margin="0 0 auto auto" height="25" width="100" backgroundColor="#f95086" >
                            <label id="addToCartLb" text="加入购物车" color="#ffffff" fontSize="13" align="center" />
                            <button id="addToCartButton" />
                        </view>
                    </view>
                </view>
                <include path="include/TestHead.xml" />
            </layout

</xsl:stylesheet>